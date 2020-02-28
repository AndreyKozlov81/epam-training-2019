package by.epam.courses.model.dao.ru;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.log4j.Logger;

import by.epam.courses.constants.DBConstants;
import by.epam.courses.model.beans.Dish;
import by.epam.courses.model.beans.Order;
import by.epam.courses.model.beans.User;
import by.epam.courses.model.dao.MySQLOrderDAO;
import by.epam.courses.model.db.ConfifurationManager;
import by.epam.courses.model.db.ConnectionPool;
import by.epam.courses.model.exceptions.OrderNotFoundEcxeption;
import by.epam.courses.model.interfaces.OrderDAO;

public class MySQLOrderDAORu implements OrderDAO {

	private final Logger logger;
	private ConnectionPool conPool;
	private ConfifurationManager config;
	
	public MySQLOrderDAORu() {
		logger = Logger.getLogger(MySQLOrderDAO.class);
		conPool = ConnectionPool.getConnectionPool();
		config = ConfifurationManager.getConfig();
	}

	@Override
	public int addOrder(Order order) {
		Connection cn = null;
		PreparedStatement pst = null;
		int result = -1;
		try {
			cn = conPool.getConnection();
			pst = cn.prepareStatement(config.SQL_ADD_ORDER);
			pst.setInt(1, order.getUser().getId());
			pst.setDate(2, order.getDate());
			pst.setBoolean(3, order.isAccepted());
			pst.setBoolean(4, order.isPaid());
			pst.setDouble(5, order.getTotalCost());
			result = pst.executeUpdate();
		}catch (SQLException e) {
			logger.error(e.getMessage());
		}finally {
			if(pst != null) {
				try {
					pst.close();
				} catch (SQLException e) {
					logger.error(e.getMessage());
				}
			}
			if(cn != null) {
				conPool.putBack(cn);
			}
		}
		return result;
	}
	
	@Override
	public int addOrderDishes(int idOrder, Map<Dish, Integer> dishes) {
		Connection cn = null;
		PreparedStatement pst = null;
		int result = -1;
		try {
			cn = conPool.getConnection();
			Set<Map.Entry<Dish, Integer>> dishesSet = dishes.entrySet();
			for (Map.Entry<Dish, Integer> entry : dishesSet) {
				pst = cn.prepareStatement(config.SQL_ADD_ORDER_DISHES);
				Dish dish = entry.getKey();
				int number = entry.getValue();
				pst.setInt(1, idOrder);
				pst.setInt(2, dish.getId());
				pst.setInt(3, number);
				result = pst.executeUpdate();
			}
		}catch (SQLException e) {
			logger.error(e.getMessage());
		}finally {
			if(pst != null) {
				try {
					pst.close();
				} catch (SQLException e) {
					logger.error(e.getMessage());
				}
			}
			if(cn != null) {
				conPool.putBack(cn);
			}
		}
		return result;
	}

	@Override
	public Order getOrderById(int idOrder) throws OrderNotFoundEcxeption {
		Connection cn = null;
		PreparedStatement pst = null;
		ResultSet rs = null;
		Map<Dish, Integer> dishes = new LinkedHashMap<Dish, Integer>();
		User user = null;
		Order order = null;
		Dish dish = null;
		Date date = null;
		String login = null;
		String email = null;
		String role = null;
		int id = 0;
		int idUser = 0;
		boolean accepted = false;
		boolean paid = false;
		try {
			cn = conPool.getConnection();
			pst = cn.prepareStatement(config.SQL_GET_ORDER_BY_ID);
			pst.setInt(1, idOrder);
			rs = pst.executeQuery();
			while(rs.next()) {
				id = rs.getInt(DBConstants.ID_LABEL);
				date = rs.getDate(DBConstants.DATE_LABEL);
				accepted = rs.getBoolean(DBConstants.ACCEPTED_LABEL);
				paid = rs.getBoolean(DBConstants.PAID_LABEL);
				idUser = rs.getInt(DBConstants.ID_USER_LABEL);
				login = rs.getString(DBConstants.LOGIN_LABEL);
				email = rs.getString(DBConstants.EMAIL_LABEL);
				role = rs.getString(DBConstants.ROLE_LABEL);
				int id_menu = rs.getInt(DBConstants.ID_MENU_LABEL);
				String name = rs.getString(DBConstants.NAME_RU_LABEL);
				double cost = rs.getDouble(DBConstants.COST_LABEL);
				int number = rs.getInt(DBConstants.NUMBER_LABEL);
				dish = new Dish(id_menu, name, cost);
				dishes.put(dish, number);
			}
			user = new User(idUser, login, email, role);
			if(user.getRole().equals(DBConstants.CUSTOMER_ROLE)) {
				order = new Order(id, date, dishes, user, accepted, paid);
			}else {
				throw new OrderNotFoundEcxeption(DBConstants.USER_NOT_CUSTOMER, user.toString());
			}
			
		} catch (SQLException e) {
			logger.error(e.getMessage());
		}finally {
			try {
				if(rs != null) {
					rs.close();
				}
				if(pst != null) {
					pst.close();
				}
				conPool.putBack(cn);
			} catch (SQLException e) {
				logger.error(e.getMessage());
			}
			
		}
		return order;
	}
	
	@Override
	public List<Order> getOrdersByIdUser(int idUser) {
		Connection cn = null;
		PreparedStatement pst = null;
		ResultSet rs = null;
		List<Order> orders = new ArrayList<Order>();
		try {
			cn = conPool.getConnection();
			pst = cn.prepareStatement(config.SQL_GET_ORDER_BY_ID_USER);
			pst.setInt(1, idUser);
			rs = pst.executeQuery();
			while(rs.next()) {
				int id = rs.getInt(DBConstants.ID_LABEL);
				Date date = rs.getDate(DBConstants.DATE_LABEL);
				boolean accepted = rs.getBoolean(DBConstants.ACCEPTED_LABEL);
				boolean paid = rs.getBoolean(DBConstants.PAID_LABEL);
				double cost = rs.getDouble(DBConstants.TOTAL_COST_LABEL);
				Order order = new Order(id, date, accepted, paid, cost);
				orders.add(order);
			}
		} catch (SQLException e) {
			logger.error(e.getMessage());
		}finally {
			try {
				if(rs != null) {
					rs.close();
				}
				if(pst != null) {
					pst.close();
				}
				conPool.putBack(cn);
			} catch (SQLException e) {
				logger.error(e.getMessage());
			}
		}
		return orders;
	}
	
	@Override
	public List<Order> getAllOrders() throws OrderNotFoundEcxeption{
		Connection cn = null;
		Statement st = null;
		ResultSet rs = null;
		List<Order> orders = new LinkedList<Order>();
		try {
			cn = conPool.getConnection();
			st = cn.createStatement();
			rs = st.executeQuery(config.SQL_GET_ALL_ORDERS);
			while(rs.next()) { 
				int id = rs.getInt(DBConstants.ID_LABEL);
				Date date = rs.getDate(DBConstants.DATE_LABEL);
				boolean accepted = rs.getBoolean(DBConstants.ACCEPTED_LABEL);
				boolean paid = rs.getBoolean(DBConstants.PAID_LABEL);
				double totalCost = rs.getDouble(DBConstants.TOTAL_COST_LABEL);
				int idUser = rs.getInt(DBConstants.ID_USER_LABEL);
				String login = rs.getString(DBConstants.LOGIN_LABEL);
				String email = rs.getString(DBConstants.EMAIL_LABEL);
				String role = rs.getString(DBConstants.ROLE_LABEL);
				User user = new User(idUser, login, email, role);
				Map<Dish, Integer> dishes = new LinkedHashMap<Dish, Integer>();
				Order order = new Order(id, date, dishes, user, accepted, paid, totalCost);	
				orders.add(order);
			}
		} catch (SQLException e) {
			logger.error(e.getMessage());
		}finally {
			try {
				if(rs != null) {
					rs.close();
				}
				if(st != null) {
					st.close();
				}
				conPool.putBack(cn);
			} catch (SQLException e) {
				logger.error(e.getMessage());
			}
		}
		return orders;
	}
	
	@Override
	public Map<Dish, Integer> getOrderDishes(int idOrder) {
		Connection cn = null;
		PreparedStatement pst = null;
		ResultSet rs = null;
		Map<Dish, Integer> dishes = new LinkedHashMap<Dish, Integer>();
		try {
			cn = conPool.getConnection();
			pst = cn.prepareStatement(config.SQL_GET_ORDER_DISHES);
			pst.setInt(1, idOrder);
			rs = pst.executeQuery();
			while(rs.next()) {
				String name = rs.getString(DBConstants.NAME_RU_LABEL);
				Double cost = rs.getDouble(DBConstants.COST_LABEL);
				int number = rs.getInt(DBConstants.NUMBER_LABEL);
				Dish dish = new Dish(name, cost);
				dishes.put(dish, number); 
			}
		} catch (SQLException e) {
			logger.error(e.getMessage());
		}
		return dishes;
	}

	@Override
	public boolean deleteOrderById(int idOrder) {
		Connection cn = null;
		PreparedStatement pst = null;
		boolean result = false;
		try {
			cn = conPool.getConnection();
			pst = cn.prepareStatement(config.SQL_DELETE_ORDER_BY_ID);
			pst.setInt(1, idOrder);
			if(pst.executeUpdate() > 0) {
				result = true;
			}
		} catch (SQLException e) {
			logger.error(e.getMessage());
		}finally {
			if(pst != null) {
				try {
					pst.close();
				} catch (SQLException e) {
					logger.error(e.getMessage());
				}
			}
			if(cn != null) {
				conPool.putBack(cn);
			}
		}
		return result;
	}
	
	@Override
	public boolean deleteOrderDishes(int idOrder) {
		Connection cn = null;
		PreparedStatement pst = null;
		boolean result = false;
		try {
			cn = conPool.getConnection();
			pst = cn.prepareStatement(config.SQL_DELETE_ORDER_DISHES);
			pst.setInt(1, idOrder);
			if(pst.executeUpdate() > 0) {
				result = true;
			}
		} catch (SQLException e) {
			logger.error(e.getMessage());
		}finally {
			if(pst != null) {
				try {
					pst.close();
				} catch (SQLException e) {
					logger.error(e.getMessage());
				}
			}
			if(cn != null) {
				conPool.putBack(cn);
			}
		}
		return result;
	}

	@Override
	public boolean updateOrder(Order order) {
		Connection cn = null;
		PreparedStatement pst = null;
		boolean result = false;
		try {
			cn = conPool.getConnection();
			pst = cn.prepareStatement(config.SQL_UPDATE_ORDER);
			pst.setInt(1, order.getUser().getId());
			pst.setDate(2, order.getDate());
			pst.setBoolean(3, order.isAccepted());
			pst.setBoolean(4, order.isPaid());
			pst.setInt(5, order.getId());
			if(pst.executeUpdate() > 0) {
				result = true;
			}
		}catch (SQLException e) {
			logger.error(e.getMessage());
		}finally {
			try {
				if(pst != null) {
					pst.close();
				}
				conPool.putBack(cn);
			}catch (SQLException e) {
				logger.error(e.getMessage());
			}
		}
		return result;
	}
	
	@Override
	public boolean updateOrderDishes(int idOrder, Map<Dish, Integer> dishes) {
		Connection cn = null;
		PreparedStatement pst = null;
		boolean result = false;
		try {
			cn = conPool.getConnection();
			
			Set<Map.Entry<Dish, Integer>> dishesSet = dishes.entrySet();
			for (Map.Entry<Dish, Integer> entry : dishesSet) {
				pst = cn.prepareStatement(config.SQL_UPDATE_ORDER_DISHES);
				Dish dish = entry.getKey();
				int number = entry.getValue();
				pst.setInt(1, dish.getId());
				pst.setInt(2, number);
				pst.setInt(3, idOrder);
				if(pst.executeUpdate() > 0) {
					result = true;
				}
			}
		}catch (SQLException e) {
			logger.error(e.getMessage());
		}finally {
			try {
				if(pst != null) {
					pst.close();
				}
				conPool.putBack(cn);
			}catch (SQLException e) {
				logger.error(e.getMessage());
			}
		}
		return result;
	}

	@Override
	public int getMaxIdOrder(int idUser) {
		Connection cn = null;
		PreparedStatement pst = null;
		ResultSet rs = null;
		int result = 0;
		try {
			cn = conPool.getConnection();
			pst = cn.prepareStatement(config.SQL_GET_MAX_ID_ORDER);
			pst.setInt(1, idUser);
			rs = pst.executeQuery();
			while(rs.next()) {
				result = rs.getInt(DBConstants.MAX_ID_LABEL);
			}
		} catch (SQLException e) {
			logger.error(e.getMessage());
		}finally {
			try {
				if(rs != null) {
					rs.close();
				}
				if(pst != null) {
					pst.close();
				}
				conPool.putBack(cn);
			} catch (SQLException e) {
				logger.error(e.getMessage());
			}
		}
		return result;
	}
}
