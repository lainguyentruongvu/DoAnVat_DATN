package poly.store.controller;

import java.util.Date;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import net.bytebuddy.utility.RandomString;
import poly.store.dao.AccountDAO;
import poly.store.dao.CartDAO;
import poly.store.entity.Account;
import poly.store.entity.Cart;
import poly.store.services.AccountService;
import poly.store.services.MailerService;
import poly.store.services.SessionService;

@Controller
public class AuthController {

	@Autowired
	SessionService session;

	@Autowired
	AccountDAO accountDAO;
	@Autowired
	CartDAO cartDAO;

	@Autowired
	AccountService accountService;

	@Autowired
	MailerService mailer;

	@CrossOrigin("*")
	@ResponseBody
	@RequestMapping("/rest/auth/authentication")
	public Object getAuthentication(HttpSession session) {
		return session.getAttribute("authentication");
	}

	@RequestMapping("/auth/login/form")
	public String logInForm(Model model, @ModelAttribute("account") Account account) {
		return "auth/login";
	}

	@RequestMapping("/auth/login/success")
	public String logInSuccess(Model model, @ModelAttribute("account") Account account) {

		String username = session.get("username");
		Account acc = accountDAO.findById(username).get();
		Cart checkcart = cartDAO.findByAccount(acc);

		if (checkcart == null) {
			Cart cart = new Cart();
			cart.setAccount(acc);
			cart.setCreateDate(new Date());
			cartDAO.save(cart);
			session.set("cart", cart);
		}
		return "redirect:/";
	}

	@RequestMapping("/auth/login/error")
	public String logInError(Model model, @Validated @ModelAttribute("account") Account account, Errors errors) {
		
			model.addAttribute("message", "Sai thông đăng nhập");
			
		return "auth/login";
	}

	@RequestMapping("/auth/unauthoried")
	public String unauthoried(Model model, @ModelAttribute("account") Account account) {
		model.addAttribute("message", "Bạn không có quyền truy cập");
		return "auth/login";
	}
	
	@RequestMapping("/auth/logout/success")
	public String logOutSuccess(Model model, @ModelAttribute("account") Account account) {
		model.addAttribute("message", "Đăng xuất thành công");
		return "auth/login";
	}

	// OAuth2
	@RequestMapping("/oauth2/login/success")
	public String oauth2(OAuth2AuthenticationToken oauth2) {
		accountService.loginFromOAuth2(oauth2);
		return "forward:/auth/login/success";
	}

	@GetMapping("/auth/register")
	public String signUpForm(Model model) {
		model.addAttribute("account", new Account());
		return "auth/register";
	}

	@PostMapping("/auth/register")
	public String signUpSuccess(Model model, @Validated @ModelAttribute("account") Account account, Errors error,
			HttpServletResponse response) {
		if (error.hasErrors()) {
			model.addAttribute("message", "Vui lòng nhập thông ");
			return "auth/register";
		}
		account.setImage("user.png");
		account.setToken("token");
		accountService.create(account);
		model.addAttribute("message", "Đăng ký tài khoản thành c");
		response.addHeader("refresh", "2;url=/auth/login/form");
		return "auth/register";
	}

	@GetMapping("/auth/forgot-password")
	public String forgotPasswordForm(Model model) {
		return "auth/forgot-password";
	}

	@PostMapping("/auth/forgot-password")
	public String processForgotPassword(@RequestParam("email") String email, HttpServletRequest request, Model model)
			throws Exception {
		try {
			String token = RandomString.make(50);
			accountService.updateToken(token, email);
			String resetLink = getSiteURL(request) + "/auth/reset-password?token=" + token;
			mailer.sendEmail(email, resetLink);
			model.addAttribute("message", "Chúng tôi đã gửi đường dẫn trong email của bạn"
					+ "Nếu bạn không thấy email vui lòng kiểm tra thư rác của bạn");
		} catch (MessagingException e) {
			e.printStackTrace();
			model.addAttribute("error", "Lỗi email");
		}
		return "auth/forgot-password";
	}

	@GetMapping("/auth/reset-password")
	public String resetPasswordForm(@Param(value = "token") String token, Model model) {
		Account account = accountService.getByToken(token);
		model.addAttribute("token", token);
		if (account == null) {
			model.addAttribute("message", "Mã không hợp lệ");
			return "redirect:/auth/login/form";
		}
		return "auth/reset-password";
	}

	@PostMapping("/auth/reset-password")
	public String processResetPassword(@RequestParam("token") String code, @RequestParam("password") String password,
			HttpServletResponse response, Model model) {
		Account token = accountService.getByToken(code);
		if (token == null) {
			model.addAttribute("message", "Mã không hợp lệ");
		} else {
			accountService.updatePassword(token, password);
			model.addAttribute("message", "Thay đổi mật khẩu thành công");
			response.addHeader("refresh", "2;url=/auth/login/form");
		}
		return "auth/reset-password";
	}

	@GetMapping("/auth/change-password")
	public String changePasswordForm(Model model) {
		return "auth/change-password";
	}

	@PostMapping("/auth/change-password")
	public String processChangePassword(Model model, @RequestParam("username") String username,
			@RequestParam("newPassword") String newPassword, @RequestParam("password") String password) {
		Account account = accountService.findById(username);

		if (newPassword.equals(password)) {
			accountService.changePassword(account, newPassword);
			model.addAttribute("message", "Đổi mật khẩu thành công");
			return "redirect:/auth/login/form";
		} else {
			model.addAttribute("message", "Đổi mật khẩu thất bại ");
			return "auth/change-password";
		}

	}

	public String getSiteURL(HttpServletRequest request) {
		String siteURL = request.getRequestURL().toString();
		return siteURL.replace(request.getServletPath(), "");
	}
}
