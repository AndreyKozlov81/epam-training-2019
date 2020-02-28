package by.epam.courses.model.interfaces;

import java.util.List;
import java.util.Map;
import by.epam.courses.model.beans.Dish;
import by.epam.courses.model.beans.Order;
import by.epam.courses.model.exceptions.OrderNotFoundEcxeption;

public interface OrderDAO {
	int addOrder(Order order);
	int addOrderDishes(int idOrder, Map<Dish, Integer> dishes);
	Order getOrderById(int idOrder) throws OrderNotFoundEcxeption;
	List<Order> getOrdersByIdUser(int idUser);
	List<Order> getAllOrders() throws OrderNotFoundEcxeption;
	Map<Dish, Integer> getOrderDishes(int idOrder);
	boolean deleteOrderById(int idOrder);
	boolean deleteOrderDishes(int idOrder);
	boolean updateOrder(Order order);
	boolean updateOrderDishes(int idOrder, Map<Dish, Integer> dishes);
	int getMaxIdOrder(int idUser);
}
