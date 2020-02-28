package by.epam.courses.controllers.ru;

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
import by.epam.courses.controllers.AddOrderController;
import by.epam.courses.model.beans.Dish;
import by.epam.courses.model.factories.DAOFactory;
import by.epam.courses.model.interfaces.MenuDAO;

@WebServlet("/AddDishControllerRu")
public class AddDishControllerRu extends HttpServlet {
	private static final long serialVersionUID = 1L;
	Logger logger = Logger.getLogger(AddOrderController.class);
       
    public AddDishControllerRu() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		InputStreamReader streamReader = new InputStreamReader(request.getInputStream());
		BufferedReader bufferReader = new BufferedReader(streamReader);
		if(bufferReader != null) {
			String jsonDish = bufferReader.readLine();
			System.out.println(jsonDish);
			Gson gson = new Gson();
			try {
				Dish dish = gson.fromJson(jsonDish, Dish.class);
				DAOFactory factory = DAOFactory.getDAOFactory(1);
				MenuDAO menuDAO = factory.getMenuDAORu();
				response.setContentType("text/html");
				response.setCharacterEncoding("UTF-8");
				if(menuDAO.addDish(dish) == 1) {
					response.getWriter().print(true);
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
