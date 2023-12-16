package poly.store.service.impl;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;



import poly.store.entity.Mailer;
import poly.store.services.MailerService;

@Service
public class MailerServiceImpl implements MailerService {

	@Autowired
	private JavaMailSender sender;

	@Override
	public void send(Mailer mail) throws MessagingException {
		MimeMessage message = sender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");
		helper.setFrom(mail.getFrom());
		helper.setTo(mail.getTo());
		helper.setSubject(mail.getSubject());
		helper.setText(mail.getBody(), true);
		helper.setReplyTo(mail.getFrom());
		String[] cc = mail.getCc();
		if (cc != null && cc.length > 0) {
			helper.setCc(cc);
		}
		String[] bcc = mail.getBcc();
		if (bcc != null && bcc.length > 0) {
			helper.setBcc(bcc);
		}
		String[] attachments = mail.getAttachments();
		if (attachments != null && attachments.length > 0) {
			for (String path : attachments) {
				File file = new File(path);
				helper.addAttachment(file.getName(), file);
			}
		}
		sender.send(message);
	}

	@Override
	public void send(String to, String subject, String body) throws MessagingException {
		this.send(new Mailer(to, subject, body));
	}
	List<Mailer> list = new ArrayList<>();
	@Override
	public void queue(Mailer mail) {
		list.add(mail);
	}

	@Override
	public void queue(String to, String subject, String body) {
		queue(new Mailer(to, subject, body));
	}

	@Scheduled(fixedDelay = 100)
	public void run() {
		while (!list.isEmpty()) {
			Mailer mail = list.remove(0);
			try {
				this.send(mail);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
//	@Override
//	public void sendEmail(String email, String link) throws MessagingException, UnsupportedEncodingException {
//		MimeMessage message = sender.createMimeMessage();
//		MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");
//		helper.setFrom("nguyentruongvu2kay@gmail.com", "STVL Fashion");
//		helper.setTo(email);
//		String button = "background-color:#783ecf;color:#fff;padding:12px 10px;text-decoration:none;border-radius:3px";
//		String subject = "Request to reset your password";
//		String content = "" + "<div style='font-family:Roboto,sans-serif;width:50%;margin:0 auto;text-align:center'>"
//				+ "<div style='font-size:3em;padding:0.5em 1em'><b>Password reset</b></div>"
//				+ "<div style='background-color:#f0f8ff;font-size:16px;padding:1em 3em'>"
//				+ "<p><b style='font-size:18px;'>Someone requested that the password be reset for the following account.</b></p>"
//				+ "<p>To reset your password, visit the following address:</p>" + "<p style='margin-top:2em'><a href=\""
//				+ link + "\" style='" + button + "'>Reset your password</a></p>"
//				+ "<p style='margin-bottom:2em'>Your mail: <a href=\"" + "mailto:" + email
//				+ "\" style='color:#b745dd;text-decoration:none'>" + email + "</a></p>"
//				+ "<p>If this was a mistake, just ignore this email and nothing will happen.</p>" + "</div>"
//				+ "<div style='font-size:14px;padding:2em'>Copyright © 2022 <b>STVL</b>. All Rights Reserved.</div>"
//				+ "</div>";
//		helper.setSubject(subject);
//		helper.setText(content, true);
//		sender.send(message);
//	}

	@Override
	public void sendEmail(String email, String link) throws MessagingException, UnsupportedEncodingException {
		MimeMessage message = sender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");
		helper.setFrom("shopdoandav@gmail.com", "DAV-6 Đồ ăn vặt");
		helper.setTo(email);
		String buttonStyle = "background-color:#FFA500;color:#fff;padding:12px 10px;text-decoration:none;border-radius:3px";
		String subject = "Yêu cầu đặt lại mật khẩu của bạn";
		String content = "" + "<div style='font-family:Roboto,sans-serif;width:60%;margin:0 auto;text-align:center'>"
				+ "<div style='font-size:2em;padding:1em 1em'><b>XÁC NHẬN THAY ĐỔI MẬT KHẨU</b></div>"
				+ "<div style='background-color:#FAEBD7;font-size:16px;border-radius:5px;padding:1.5em 3em'>"
				+ "<img src=\"https://i.ibb.co/cDwD3b1/logo-noback.png\" alt='DAV-6 Logo' style='width:250px;height:150px;margin-bottom:1em;'>"
				+ "<p>Chúng tôi nhận được yêu cầu thay đổi mật khẩu cho tài khoản của bạn tại DAV-6. Bạn vui lòng bấm vào nút dưới đây để tiếp tục:</p>"
				+ "<p style='margin-top:2em'><a href=\"" + link + "\" style='" + buttonStyle
				+ "'>Thay đổi mật khẩu</a></p>" + "<p style='margin-bottom:2em'>Email của bạn: <a href=\"" + "mailto:"
				+ email + "\" style='color:#b745dd;text-decoration:none'>" + email + "</a></p>"
				+ "<p>Nếu bạn không yêu cầu thay đổi mật khẩu, vui lòng bỏ qua email này.</p>"
				+ "<p style='margin-top:2em'>Trân trọng,</p>" + "<p>DAV-6 Đồ ăn vặt</p>" + "</div>"
				+ "<div style='font-size:14px;padding:2em;color:#777'>© 2023 <b>DAV-6</b>. All Rights Reserved.</div>"
				+ "</div>";
		helper.setSubject(subject);
		helper.setText(content, true);
		sender.send(message);
	}

}
