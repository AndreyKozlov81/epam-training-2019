package by.epam.courses.model.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayDeque;
import java.util.Deque;
import org.apache.log4j.Logger;

public class ConnectionPool {
	private static ConnectionPool pool;
	private Deque<Connection> availableConnections = new ArrayDeque<Connection>();
	private Deque<Connection> usedConnections = new ArrayDeque<Connection>();
	private final String DRIVER_NAME = ConfifurationManager.getConfig().DB_DRIVER;
	private final String URL_DB = ConfifurationManager.getConfig().DB_URL;
	private final String USER_DB = ConfifurationManager.getConfig().DB_USER; 
	private final String PASS_DB = ConfifurationManager.getConfig().DB_PASSWORD;
	private final int POOL_SIZE_DB = Integer.parseInt(ConfifurationManager.getConfig().DB_POOLSIZE);
	final Logger logger = Logger.getLogger(ConnectionPool.class);
	
	private ConnectionPool() {
		super();
	}
	
	public static ConnectionPool getConnectionPool() {
		synchronized (ConnectionPool.class) {
			if(pool == null) {
				pool = new ConnectionPool();
				pool.fillConnectionPool();
				return pool;
			}else {
				return pool;
			}
		}
	}
	
	private void fillConnectionPool() {
		try {
			Class.forName(DRIVER_NAME);
		} catch (ClassNotFoundException e) {
			logger.error(e.getMessage());
		}
		for (int i = 0; i < POOL_SIZE_DB; i++) {
			availableConnections.add(createConnection());
		}
	}
	
	private Connection createConnection() {
		Connection connection = null;
		try {
			connection = DriverManager.getConnection(URL_DB, USER_DB, PASS_DB);
		} catch (SQLException e) {
			logger.error(e.getMessage());
		}
		return connection;
	}
	
	public synchronized Connection getConnection() {
		Connection newConn = null;
		if(availableConnections.size() == 0) {
			newConn = createConnection();
		}else {
			newConn = availableConnections.getLast();
		}
		usedConnections.add(newConn);
		return newConn;
	}
	
	public synchronized void putBack(Connection c) throws NullPointerException {
		if(c != null) {
			if(usedConnections.remove(c)) {
				availableConnections.add(c);
			}else {
				throw new NullPointerException("Connection is not in the usedConnections array");
			}
		}
	}
	
	public int getAvailableConnsCnt() {
		return availableConnections.size();
	}
}
