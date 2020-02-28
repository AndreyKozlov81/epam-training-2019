package by.epam.courses.controllers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Logger;
import com.google.gson.Gson;
import by.epam.courses.model.beans.User;
import by.epam.courses.constants.DBConstants;
import by.epam.courses.model.factories.DAOFactory;
import by.epam.courses.model.interfaces.UserDAO;

/**
 * This controller receives a request from the client with data about the user, 
 * adds the user to the database 
 * if the user is successfully added, send a response with a message indicating 
 * that the user is successfully added,  
 * if the user is not added then send a response stating that user already exists
 * 
 * @author AndreyKazlou
 * @version 1.0
 **/
@WebServlet("/RegController")
public class RegController extends HttpServlet {
	private static final long serialVersionUID = 1L;
    Logger logger = Logger.getLogger(RegController.class);
	
	public RegController() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		InputStreamReader streamReader = new InputStreamReader(request.getInputStream());
		BufferedReader bufferReader = new BufferedReader(streamReader);
		if(bufferReader != null) {
			String jsonUser = bufferReader.readLine();
			Gson gson = new Gson();
			try {
				User user = gson.fromJson(jsonUser, User.class);
				user.setRole(DBConstants.CUSTOMER_ROLE);
				DAOFactory factory = DAOFactory.getDAOFactory(1);
				UserDAO userDAO = factory.getUserDAO();
				if(userDAO.addUser(user) > 0) {
					response.setContentType("text/html");
					response.setCharacterEncoding("UTF-8");
					response.getWriter().write(DBConstants.USER_ADDED);
				}else {
					response.getWriter().write(DBConstants.USER_EXISTS);
				}
			}catch (Exception e){
				logger.error(e.getMessage());
			}
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
