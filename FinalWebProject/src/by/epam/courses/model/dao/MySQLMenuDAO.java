package by.epam.courses.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import by.epam.courses.model.beans.Dish;
import by.epam.courses.constants.DBConstants;
import by.epam.courses.model.db.ConfifurationManager;
import by.epam.courses.model.db.ConnectionPool;
import by.epam.courses.model.interfaces.MenuDAO;

/**
 * The class implements methods of the MenuDAO interface for working with the Menu object. 
 * Contains methods to add dish to menu, delete dish from menu, get dish from menu, 
 * update dish from menu.
 * 
 * @author AndreyKazlou
 * @version 1.0
 **/
public class MySQLMenuDAO implements MenuDAO {
	private final Logger logger;
	private ConnectionPool conPool;
	private ConfifurationManager config;
	
	public MySQLMenuDAO() {
		super();
		logger = Logger.getLogger(MySQLMenuDAO.class);
		conPool = ConnectionPool.getConnectionPool();
		config = ConfifurationManager.getConfig();
	}

	@Override
	public int addDish(Dish dish) {
		Connection cn = null;
		PreparedStatement pst = null;
		int result = -1;
		try {
			cn = conPool.getConnection();
			pst = cn.prepareStatement(config.SQL_ADD_DISH);
			pst.setString(1, dish.getName());
			pst.setDouble(2, dish.getCost());
			result = pst.executeUpdate();
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
	public Dish getDishById(int idDish) {
		Connection cn = null;
		PreparedStatement pst = null;
		ResultSet rs = null;
		Dish dish = null;
		try {
			cn = conPool.getConnection();
			pst = cn.prepareStatement(config.SQL_GET_DISH_BY_ID);
			pst.setInt(1, idDish);
			rs = pst.executeQuery();
			while(rs.next()) {
				int id = rs.getInt(DBConstants.ID_MENU_LABEL);
				String nameDish = rs.getString(DBConstants.NAME_LABEL);
				double cost = rs.getDouble(DBConstants.COST_LABEL);
				dish = new Dish(id, nameDish, cost);
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
		return dish;
	}
	
	
	
	
	@Override
	public List<Dish> getAllDishes() {
		Connection cn = null;
		Statement st = null;
		ResultSet rs = null;
		List<Dish> dishes = new ArrayList<Dish>();
		try {
			cn = conPool.getConnection();
			st = cn.createStatement();
			rs = st.executeQuery(config.SQL_GET_ALL_DISHES);
			while(rs.next()) {
				int id = rs.getInt(DBConstants.ID_MENU_LABEL);
				String nameDish = rs.getString(DBConstants.NAME_LABEL);
				double cost = rs.getDouble(DBConstants.COST_LABEL);
				Dish dish = new Dish(id, nameDish, cost);
				dishes.add(dish);
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
		return dishes;
	}

	@Override
	public boolean deleteDish(int idDish) {
		Connection cn = null;
		PreparedStatement pst = null;
		boolean result = false;
		try {
			cn = conPool.getConnection();
			pst = cn.prepareStatement(config.SQL_DELETE_DISH);
			pst.setInt(1, idDish);
			if(!isDishInOrders(idDish)) {
				if(pst.executeUpdate() > 0) {
					result = true;
				}
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
	public boolean updateDish(int idDish, Dish dish) {
		Connection cn = null;
		PreparedStatement pst = null;
		boolean result = false;
		try {
			cn = conPool.getConnection();
			pst = cn.prepareStatement(config.SQL_UPDATE_DISH);
			pst.setString(1, dish.getName());
			pst.setDouble(2, dish.getCost());
			pst.setInt(3, idDish);
			if(!isDishInOrders(idDish)) {
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

	private boolean isDishInOrders(int idDish) {
		Connection cn = null;
		PreparedStatement pst = null;
		ResultSet rs = null;
		boolean result = false;
		try {
			cn = conPool.getConnection();
			pst = cn.prepareStatement(config.SQL_GET_DISH_BY_ID_MENU);
			pst.setInt(1, idDish);
			rs = pst.executeQuery();
			while(rs.next()) {
				result = true;
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
