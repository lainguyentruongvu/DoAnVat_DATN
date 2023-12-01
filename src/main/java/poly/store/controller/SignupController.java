package poly.store.controller;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Random;

import javax.mail.MessagingException;

import org.hibernate.boot.model.relational.AbstractAuxiliaryDatabaseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import poly.store.dao.AccountDAO;
import poly.store.dao.AuthorityDAO;
import poly.store.dao.CartDAO;
import poly.store.dao.RoleDAO;
import poly.store.entity.Account;
import poly.store.entity.Authority;
import poly.store.service.impl.MailerServiceImpl;
import poly.store.services.SessionService;

@Controller
public class SignupController {

	@Autowired
	MailerServiceImpl mailer;
	@Autowired
	AccountDAO dao; // làm việc với bảng Account
	@Autowired
	SessionService session;
	@Autowired
	CartDAO cartdao;
	@Autowired
	RoleDAO rdao;
	@Autowired
	AuthorityDAO audao;

	public String getRandomString(int n) {
		String txt = "1234567890";
		StringBuilder sb = new StringBuilder();
		while (n > 0) {
			Random rd = new Random();
			sb.append(txt.charAt(rd.nextInt(txt.length())));
			n--;
		}
		return sb.toString();
	}

	@RequestMapping("signup")
	public String index(Model model) {
		model.addAttribute("account", new Account());
		return "auth/dangKy";
	}

	@RequestMapping("create")
	public String create(Account account, @RequestParam("email") String email, Model model,
			@RequestParam("password") String password, @RequestParam("confirm") String confirm,
			@RequestParam("username") String username) throws IllegalStateException, IOException, MessagingException {

		List<Account> all = dao.findAll();
		for (Account account2 : all) {
			if (account2.getUsername().equals(username)) {
				model.addAttribute("account", account);
				model.addAttribute("message", "Tên đăng nhập đã được sử dụng ");
				return "auth/dangKy";
			}
			else if (account2.getEmail().equals(email)) {
				model.addAttribute("account", account);
				model.addAttribute("message", "Email đã được sử dụng ");
				return "auth/dangKy";
			}

		}
		String tokencode = getRandomString(6);
		 Integer mxn = Integer.parseInt(tokencode);

		String thongBao = "Thông báo: Mã xác nhận mã \r\n" + "\r\n" + "Kính gửi quý khách hàng,\r\n" + "\r\n <br>	"
				+ "Chúng tôi gửi đến quý khách mã xác nhận mới để đảm bảo tính bảo mật cho tài khoản của quý khách. Mã xác nhận này được sử dụng để xác thực và bảo vệ quyền riêng tư của quý khách trong quá trình sử dụng dịch vụ của chúng tôi.\r\n <br>	"
				+ "\r\n" + "Dưới đây là mã xác nhận code của quý khách:\r\n" + "<br>" + mxn + "</br>" + "\r\n"
				+ "\r\n <br>	"
				+ "Vui lòng sử dụng mã xác nhận này để tiếp tục các hoạt động và giao dịch trên tài khoản của quý khách. Chúng tôi khuyến nghị quý khách không tiết lộ mã xác nhận  này cho bất kỳ ai khác và không gửi mã này qua email hay tin nhắn điện thoại.\r\n <br>	"
				+ "\r\n"
				+ "Nếu quý khách không yêu cầu hoặc không nhớ có bất kỳ hoạt động liên quan đến mã xác nhận này, vui lòng liên hệ với bộ phận hỗ trợ khách hàng của chúng tôi ngay để được hỗ trợ và đảm bảo an toàn cho tài khoản của quý khách.\r\n <br>	"
				+ "\r\n" + "Xin chân thành cảm ơn quý khách hàng đã sử dụng dịch vụ của chúng tôi.\r\n" + "\r\n <br>"
				+ "Trân trọng,\r\n" + "DAV 6";

		if (confirm.equals(password)) {
			mailer.send(email, "YÊU CẦU MÃ XÁC NHẬN TỪ NGƯỜI DÙNG!", thongBao);
			session.set("mxn", mxn);
			session.set("account", account);

			return "auth/confirmdk";
		} else {
			model.addAttribute("account", account);
			model.addAttribute("message", "Xác nhận mật khẩu không chính xác");
			return "auth/dangKy";
		}
//		}

	}

	@RequestMapping("confirm")
	public String Confirm(Model model, @RequestParam("confirm") Integer confirm) {
		
		Integer token = session.get("mxn");
		System.out.println(confirm);
		System.out.println(token);
		if (confirm == null) {
			model.addAttribute("error", "Vui lòng nhập mã xác nhận!");
			return "auth/confirmdk";
		} else {
			if (!confirm.equals(token)) {
				model.addAttribute("error", "Mã Xác Nhận Không Chính Xác!");
				return "auth/confirmdk";
			} else {
				Account item = session.get("account");
				// item.setCreatedate(new Date());
				model.addAttribute("item", item);
				dao.save(item);
				Authority au = new Authority();
				au.setAccount(item);
				au.setRole(rdao.findById("CUST").get());
				audao.save(au);
			}
		}
		return "/auth/dangnhap";
	}

	@RequestMapping("signin")
	public String signin() {
		return "redirect:/auth/login/form";
	}
}
