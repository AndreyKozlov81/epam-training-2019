package by.epam.courses.controllers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;
import java.util.Map;

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
import by.epam.courses.model.interfaces.OrderDAO;

@WebServlet("/GetOrdersUserController")
public class GetOrdersUserController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	Logger logger = Logger.getLogger(GetOrdersUserController.class);
       
    public GetOrdersUserController() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		InputStreamReader streamReader = new InputStreamReader(request.getInputStream());
		BufferedReader bufferReader = new BufferedReader(streamReader);
		if(bufferReader != null) {
			String idUser = bufferReader.readLine();
			try {
				Gson gson = new Gson();
				DAOFactory factory = DAOFactory.getDAOFactory(1);
				OrderDAO orderDAO = factory.getOrderDAO();
				List<Order> orders = orderDAO.getOrdersByIdUser(Integer.parseInt(idUser));
				if(orders != null) {
					String ordersJson = gson.toJson(orders);
					response.setContentType("application/json");
					response.setCharacterEncoding("UTF-8");
					response.getWriter().write(ordersJson);
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
