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
import com.google.gson.GsonBuilder;

import by.epam.courses.constants.DBConstants;
import by.epam.courses.model.beans.Dish;
import by.epam.courses.model.beans.Order;
import by.epam.courses.model.factories.DAOFactory;
import by.epam.courses.model.interfaces.MenuDAO;
import by.epam.courses.model.interfaces.OrderDAO;


@WebServlet("/UpdateDishController")
public class UpdateDishController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	Logger logger = Logger.getLogger(UpdateDishController.class);
       
    public UpdateDishController() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		InputStreamReader streamReader = new InputStreamReader(request.getInputStream());
		BufferedReader bufferReader = new BufferedReader(streamReader);
		if(bufferReader != null) {
			String dishJson = bufferReader.readLine();
			Gson gson = new Gson();
			try {
				Dish dish = gson.fromJson(dishJson, Dish.class);
				DAOFactory factory = DAOFactory.getDAOFactory(1);
				MenuDAO menuDAO = factory.getMenuDAO();
				response.setContentType("application/text");
				response.setCharacterEncoding("UTF-8");
				if(menuDAO.updateDish(dish.getId(), dish)) {
					response.getWriter().write(DBConstants.DISH_CHANGED);
				}else {
					response.getWriter().write(DBConstants.DISH_NOT_CHANGED);
				}
			} catch (Exception e) {
				logger.error(e.getMessage());
			}
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
