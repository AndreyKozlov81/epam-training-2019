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
import by.epam.courses.model.factories.DAOFactory;
import by.epam.courses.model.interfaces.OrderDAO;

@WebServlet("/DeleteOrderController")
public class DeleteOrderController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	Logger logger = Logger.getLogger(DeleteOrderController.class);
       
    public DeleteOrderController() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		InputStreamReader streamReader = new InputStreamReader(request.getInputStream());
		BufferedReader bufferReader = new BufferedReader(streamReader);
		if(bufferReader != null) {
			String orderJson = bufferReader.readLine();
			Gson gson = new GsonBuilder().setDateFormat(DBConstants.DATE_PATTERN).create();
			try {
				int idOrder = Integer.parseInt(orderJson);
				DAOFactory factory = DAOFactory.getDAOFactory(1);
				OrderDAO orderDAO = factory.getOrderDAO();
				response.setContentType("application/text");
				response.setCharacterEncoding("UTF-8");
				orderDAO.deleteOrderDishes(idOrder);
				if(orderDAO.deleteOrderById(idOrder)) {
					response.getWriter().write("Order deleted");
				}else {
					response.getWriter().write("Order not deleted!!!");
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
