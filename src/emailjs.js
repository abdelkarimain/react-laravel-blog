import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

const sendCustomEmail = (details) => {
  emailjs.init(import.meta.env.VITE_EMAIL_JS_API_KEY);
  emailjs
    .send(
      import.meta.env.VITE_EMAIL_JS_SERVICE_ID, // The service ID saved in the .env file
      import.meta.env.VITE_EMAIL_JS_TEMPLATE_ID, // The template ID also saved in the .env file
      // Start of the variables defined in the template earlier
      {
        sender_email: details.sender_email,
        sender_name: sender.name,
        message: details.message,
      }
      // End of the variables defined in the template earlier
    )
    .then((response) => {
      // Debug statement on the console to show the function has been executed successfully
      console.log(response);
      toast.success("Message sent successfully");
    })
    .catch((error) => {
      // Debug statement on the console to show the error that occured
      console.log(error);
      toast.error("Something went wrong");
    });
};

export { sendCustomEmail };