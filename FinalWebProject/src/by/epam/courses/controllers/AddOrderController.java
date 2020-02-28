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
import by.epam.courses.model.beans.Order;
import by.epam.courses.model.beans.User;
import by.epam.courses.model.factories.DAOFactory;
import by.epam.courses.model.interfaces.OrderDAO;
import by.epam.courses.model.interfaces.UserDAO;

@WebServlet("/AddOrderController")
public class AddOrderController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	Logger logger = Logger.getLogger(AddOrderController.class);
    
	public AddOrderController() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		InputStreamReader streamReader = new InputStreamReader(request.getInputStream());
		BufferedReader bufferReader = new BufferedReader(streamReader);
		if(bufferReader != null) {
			String jsonOrder = bufferReader.readLine();
			Gson gson = new GsonBuilder().setDateFormat(DBConstants.DATE_PATTERN).create();
			try {
				Order order = gson.fromJson(jsonOrder, Order.class);
				order.setTotalCost();
				DAOFactory factory = DAOFactory.getDAOFactory(1);
				OrderDAO orderDAO = factory.getOrderDAO();
				response.setContentType("text/html");
				response.setCharacterEncoding("UTF-8");
							
				if(orderDAO.addOrder(order) == 1) {
					int idOrder = orderDAO.getMaxIdOrder(order.getUser().getId());
					if(orderDAO.addOrderDishes(idOrder, order.getDishes()) == 1) {
						response.getWriter().print(true);
					}
				}else {
					response.getWriter().print(false);
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
