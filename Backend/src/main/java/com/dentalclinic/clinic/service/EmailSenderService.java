package com.dentalclinic.clinic.service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import com.dentalclinic.clinic.dto.response.AppointmentResponseDto;
import com.dentalclinic.clinic.dto.response.PatientResponseDto;
import java.time.format.DateTimeFormatter;

@Service
public class EmailSenderService {

    private JavaMailSender mailSender;
    private String fromEmail;
    private String clinicName;

    public EmailSenderService(JavaMailSender mailSender,  @Value("${app.email.from}")String fromEmail, @Value("${app.email.clinic-name}") String clinicName) {
        this.mailSender = mailSender;
        this.fromEmail = fromEmail;
        this.clinicName = clinicName;
    }

    public void sendAppointmentConfirmation(AppointmentResponseDto appointment) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(appointment.getPatient().getEmail());
            message.setSubject("✅ Confirmación de Cita - " + clinicName);

            String emailBody = buildAppointmentConfirmationBody(appointment);
            message.setText(emailBody);

            mailSender.send(message);
            System.out.println("✅ Email enviado a: " + appointment.getPatient().getEmail());

        } catch (Exception e) {
            System.err.println("Error sending email: " + e.getMessage());
        }
    }
    public void sendWelcomeEmail(PatientResponseDto patient) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(patient.getEmail());
            message.setSubject("🦷 Welcome to " + clinicName);

            String emailBody = buildWelcomeBody(patient);
            message.setText(emailBody);

            mailSender.send(message);
            System.out.println("Welcome email sent to: " + patient.getEmail());

        } catch (Exception e) {
            System.err.println("Error sending welcome email: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private String buildAppointmentConfirmationBody(AppointmentResponseDto appointment) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
        String formattedDate = appointment.getDate();

        return String.format(
                "Dear/a %s %s,\n\n" +
                        "Your appointment is successfully confirmed.\n\n" +
                        "📅 Appointment details:\n" +
                        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
                        "Date: %s\n" +
                        "Dentist: Dr/a. %s %s\n" +
                        "Clinic: %s\n" +
                        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
                        "please arrive 10 minutes earlier.\n\n" +
                        "You can cancel or reschedule this appointment throw our website.\n\n" +
                        "Thank you,\n" +
                        "%s\n\n" +
                        "---\n" +
                        "This is an automatic email, please do not answer.",

                appointment.getPatient().getName(),
                appointment.getPatient().getLastname(),
                formattedDate,
                appointment.getOdontologist().getName(),
                appointment.getOdontologist().getLastname(),
                clinicName,
                clinicName
        );
    }

    private String buildWelcomeBody(PatientResponseDto patient) {
        return String.format(
                "¡Hello %s!\n\n" +
                        "Welcome to %s 🦷\n\n" +
                        "You have successfully complete your registration.\n\n" +
                        "Now you can:\n" +
                        "• Book appointments with our specialists\n" +
                        "•Review your booked and past appointments\n" +
                        "• Update your personal information\n\n" +
                        "We are here to care your oral health.\n\n" +
                        "Greetings,\n" +
                        "Dentalcare team %s\n\n" +
                        "---\n" +
                        "This is an automatic email, please do not answer.",

                patient.getName(),
                clinicName,
                clinicName
        );
    }



}
