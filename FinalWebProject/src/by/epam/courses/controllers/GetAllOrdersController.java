package by.epam.courses.controllers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.google.gson.Gson;

import by.epam.courses.model.beans.Order;
import by.epam.courses.model.beans.User;
import by.epam.courses.model.exceptions.OrderNotFoundEcxeption;
import by.epam.courses.model.factories.DAOFactory;
import by.epam.courses.model.interfaces.OrderDAO;
import by.epam.courses.model.interfaces.UserDAO;

/**
 * This controller receives all orders from the database and sends them to the client
 * 
 * @author AndreyKazlou
 * @version 1.0
 **/
@WebServlet("/GetAllOrdersController")
public class GetAllOrdersController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	Logger logger = Logger.getLogger(GetAllOrdersController.class);
       
    public GetAllOrdersController() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			Gson gson = new Gson();
			try {
				DAOFactory factory = DAOFactory.getDAOFactory(1);
				OrderDAO orderDAO = factory.getOrderDAO();
				List<Order> orders = orderDAO.getAllOrders();
				if(orders != null) {
					String allOrders = gson.toJson(orders);
					response.setContentType("application/json");
					response.setCharacterEncoding("UTF-8");
					response.getWriter().write(allOrders);
				}
			}catch (OrderNotFoundEcxeption e){
				logger.error(e.getInfo() + " " + e.getValue());
			}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
