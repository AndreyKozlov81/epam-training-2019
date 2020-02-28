package by.epam.courses.controllers.ru;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
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
import by.epam.courses.controllers.GetOrderDishesController;
import by.epam.courses.model.beans.Dish;
import by.epam.courses.model.beans.Order;
import by.epam.courses.model.factories.DAOFactory;
import by.epam.courses.model.interfaces.OrderDAO;

@WebServlet("/GetOrderDishesControllerRu")
public class GetOrderDishesControllerRu extends HttpServlet {
	private static final long serialVersionUID = 1L;
	Logger logger = Logger.getLogger(GetOrderDishesController.class);
       
    public GetOrderDishesControllerRu() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		InputStreamReader streamReader = new InputStreamReader(request.getInputStream());
		BufferedReader bufferReader = new BufferedReader(streamReader);
		if(bufferReader != null) {
			String orderJson = bufferReader.readLine();
			Gson gson = new GsonBuilder().setDateFormat(DBConstants.DATE_PATTERN).create();
			try {
				Order order = gson.fromJson(orderJson, Order.class);
				DAOFactory factory = DAOFactory.getDAOFactory(1);
				OrderDAO orderDAO = factory.getOrderDAORu();
				Map<Dish, Integer> dishes = orderDAO.getOrderDishes(order.getId());
				if(dishes != null) {
					String dishesJson = gson.toJson(dishes);
					response.setContentType("application/json");
					response.setCharacterEncoding("UTF-8");
					response.getWriter().write(dishesJson);
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
