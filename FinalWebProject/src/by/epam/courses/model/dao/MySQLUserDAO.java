package by.epam.courses.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.apache.log4j.Logger;
import by.epam.courses.model.beans.User;
import by.epam.courses.constants.DBConstants;
import by.epam.courses.model.db.ConfifurationManager;
import by.epam.courses.model.db.ConnectionPool;
import by.epam.courses.model.interfaces.UserDAO;

/**
 * The class implements methods of the UserDAO interface for working with the User object. 
 * Contains methods: 
 *  - add an user to the database, 
 *  - delete an user from the database,
 *  - get an user from the database,
 *  - update an user in the database .
 * 
 * @author AndreyKazlou
 * @version 1.0
 **/
public class MySQLUserDAO implements UserDAO{
	private final Logger logger;
	private ConnectionPool conPool;
	private ConfifurationManager config;
		
	public MySQLUserDAO() {
		conPool = ConnectionPool.getConnectionPool();
		config = ConfifurationManager.getConfig();
		logger = Logger.getLogger(MySQLUserDAO.class);
	}

	@Override
	public int addUser(User user) {
		Connection cn = null;
		PreparedStatement pst = null;
		int result = -1;
		try {
			cn = conPool.getConnection();
			pst = cn.prepareStatement(config.SQL_ADD_USER);
			pst.setString(1, user.getLogin());
			pst.setString(2, user.getEmail());
			pst.setString(3, user.getRole());
			pst.setString(4, user.getPassword());
			synchronized (MySQLUserDAO.class) {
				if(!isFoundLogin(user.getLogin()) && !isFoundEmail(user.getEmail())) {
					result = pst.executeUpdate();
				}
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
	
	private boolean isFoundLogin(String login) {
		Connection cn = null;
		PreparedStatement pst = null;
		ResultSet rs = null;
		boolean result = false;
		try {
			cn = conPool.getConnection();
			pst = cn.prepareStatement(config.SQL_FOUND_LOGIN);
			pst.setString(1, login);
			rs = pst.executeQuery();
			result = rs.next();
		} catch (SQLException e) {
			logger.error(e.getMessage());
		}
		return result;
	}
	
	private boolean isFoundEmail(String email) {
		Connection cn = null;
		PreparedStatement pst = null;
		ResultSet rs = null;
		boolean result = false;
		try {
			cn = conPool.getConnection();
			pst = cn.prepareStatement(config.SQL_FOUND_EMAIL);
			pst.setString(1, email);
			rs = pst.executeQuery();
			result = rs.next();
		} catch (SQLException e) {
			logger.error(e.getMessage());
		}
		return result;
	}
	
	@Override
	public boolean deleteUser(int id) {
		Connection cn = null;
		PreparedStatement pst = null;
		boolean result = false;
		try {
			cn = conPool.getConnection();
			pst = cn.prepareStatement(config.SQL_DELETE_USER);
			pst.setInt(1, id);
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
	public User getUserById(int id) {
		Connection cn = null;
		PreparedStatement pst = null;
		ResultSet rs = null;
		User user = null;
		try {
			cn = conPool.getConnection();
			pst = cn.prepareStatement(config.SQL_GET_USER_BY_ID);
			pst.setInt(1, id);
			rs = pst.executeQuery();
			while(rs.next()) {
				int idUser = rs.getInt(DBConstants.ID_USER_LABEL);
				String login = rs.getString(DBConstants.LOGIN_LABEL);
				String email = rs.getString(DBConstants.EMAIL_LABEL);
				String role = rs.getString(DBConstants.ROLE_LABEL);
				user = new User(idUser, login, email, role);
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
		return user;
	}
	
	@Override
	public User getUserByLoginAndPassword(String login, String password) {
		Connection cn = null;
		PreparedStatement pst = null;
		ResultSet rs = null;
		User user = null;
		try {
			cn = conPool.getConnection();
			pst = cn.prepareStatement(config.SQL_GET_USER_BY_LOGIN_AND_PASSWORD);
			pst.setString(1, login);
			pst.setString(2, password);
			rs = pst.executeQuery();
			while(rs.next()) {
				int idUser = rs.getInt(DBConstants.ID_USER_LABEL);
				String loginUser = rs.getString(DBConstants.LOGIN_LABEL);
				String email = rs.getString(DBConstants.EMAIL_LABEL);
				String role = rs.getString(DBConstants.ROLE_LABEL);
				user = new User(idUser, loginUser, email, role);
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
		return user;
	}
	
	@Override
	public boolean updateUser(int id, User user) {
		Connection cn = null;
		PreparedStatement pst = null;
		boolean result = false;
		try {
			cn = conPool.getConnection();
			pst = cn.prepareStatement(config.SQL_UPDATE_USER);
			pst.setString(1, user.getLogin());
			pst.setString(2, user.getEmail());
			pst.setString(3, user.getRole());
			pst.setString(4, user.getPassword());
			pst.setInt(4, id);
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
}
