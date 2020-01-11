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
import by.epam.courses.beans.User;
import by.epam.courses.constants.Constants;
import by.epam.courses.factories.DAOFactory;
import by.epam.courses.interfaces.UserDAO;

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
				DAOFactory factory = DAOFactory.getDAOFactory(1);
				UserDAO userDAO = factory.getUserDAO();
				if(userDAO.addUser(user)) {
					response.setContentType("text/html");
					response.setCharacterEncoding("UTF-8");
					response.getWriter().write(Constants.USER_ADDED);
				}else {
					response.getWriter().write(Constants.USER_EXISTS);
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
