package poly.store.services;

import java.io.UnsupportedEncodingException;

import javax.mail.MessagingException;

import poly.store.entity.Mailer;

public interface MailerService {

	void send(Mailer mail) throws MessagingException;

	void send(String to, String subject, String body) throws MessagingException;

	void sendEmail(String recipientEmail, String link) throws MessagingException, UnsupportedEncodingException;

}
