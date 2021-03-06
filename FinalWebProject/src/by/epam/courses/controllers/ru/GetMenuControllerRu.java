package by.epam.courses.controllers.ru;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.google.gson.Gson;

import by.epam.courses.model.beans.Dish;
import by.epam.courses.model.factories.DAOFactory;
import by.epam.courses.model.interfaces.MenuDAO;

@WebServlet("/GetMenuControllerRu")
public class GetMenuControllerRu extends HttpServlet {
	private static final long serialVersionUID = 1L;
	Logger logger = Logger.getLogger(GetMenuControllerRu.class);
       
    public GetMenuControllerRu() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Gson gson = new Gson();
		try {
			DAOFactory factory = DAOFactory.getDAOFactory(1);
			MenuDAO menuDAO = factory.getMenuDAORu();
			List<Dish> dishes = menuDAO.getAllDishes();
			if(dishes != null) {
				String allDishes = gson.toJson(dishes);
				response.setContentType("application/json");
				response.setCharacterEncoding("UTF-8");
				response.getWriter().write(allDishes);
			}
		}catch (Exception e){
			logger.error(e.getMessage());
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
