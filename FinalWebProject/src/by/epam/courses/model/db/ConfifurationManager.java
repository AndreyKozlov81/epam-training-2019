package by.epam.courses.model.db;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import by.epam.courses.model.db.ConfifurationManager;

/**
 * The class implements methods of the OrderDAO interface for working with the Order object. 
 * Contains methods: 
 *  - add an order to the database, 
 *  - delete an order from the database,
 *  - get an order from the database,
 *  - update an order in the database .
 * 
 * @author AndreyKazlou
 * @version 1.0
 **/
public class ConfifurationManager {
	private static ConfifurationManager instance;
	
	public final String DB_DRIVER;
	public final String DB_USER;
	public final String DB_PASSWORD;
	public final String DB_POOLSIZE;
	public final String DB_URL;
	public final String SQL_ADD_USER;
	public final String SQL_DELETE_USER;
	public final String SQL_GET_USER_BY_ID;
	public final String SQL_GET_USER_BY_LOGIN_AND_PASSWORD;
	public final String SQL_UPDATE_USER;
	public final String SQL_ADD_DISH;
	public final String SQL_ADD_DISH_RU;
	public final String SQL_GET_DISH_BY_ID;
	public final String SQL_GET_DISH_BY_ID_MENU;
	public final String SQL_GET_ALL_DISHES;
	public final String SQL_DELETE_DISH;
	public final String SQL_UPDATE_DISH;
	public final String SQL_UPDATE_DISH_RU;
	public final String SQL_ADD_ORDER;
	public final String SQL_ADD_ORDER_DISHES;
	public final String SQL_GET_ORDER_BY_ID;
	public final String SQL_GET_ORDER_BY_ID_USER;
	public final String SQL_GET_ALL_ORDERS;
	public final String SQL_GET_ORDER_DISHES;
	public final String SQL_UPDATE_ORDER;
	public final String SQL_UPDATE_ORDER_DISHES;
	public final String SQL_DELETE_ORDER_BY_ID;
	public final String SQL_DELETE_ORDER_DISHES;
	public final String SQL_GET_MAX_ID_ORDER;
	public final String SQL_FOUND_LOGIN;
	public final String SQL_FOUND_EMAIL;
		
	private ConfifurationManager () {
		DB_DRIVER = getProperty("db.driver");
		DB_USER = getProperty("db.user");
		DB_PASSWORD = getProperty("db.password");
		DB_POOLSIZE = getProperty("db.poolsize");
		DB_URL = getProperty("db.url");
		SQL_ADD_USER = getSQL("sql.addUser");
		SQL_DELETE_USER = getSQL("sql.deleteUser");
		SQL_GET_USER_BY_ID = getSQL("sql.getUserById");
		SQL_GET_USER_BY_LOGIN_AND_PASSWORD = getSQL("sql.getUserByLoginAndPassword");
		SQL_UPDATE_USER = getSQL("sql.updateUser");
		SQL_ADD_DISH = getSQL("sql.addDish");
		SQL_ADD_DISH_RU = getSQL("sql.addDishRu");
		SQL_GET_DISH_BY_ID = getSQL("sql.getDishById");
		SQL_GET_DISH_BY_ID_MENU = getSQL("sql.getDishByIdMenu");
		SQL_GET_ALL_DISHES = getSQL("sql.getAllDishes");
		SQL_DELETE_DISH = getSQL("sql.deleteDish");
		SQL_UPDATE_DISH = getSQL("sql.updateDish");
		SQL_UPDATE_DISH_RU = getSQL("sql.updateDishRu");
		SQL_ADD_ORDER = getSQL("sql.addOrder");
		SQL_ADD_ORDER_DISHES = getSQL("sql.addOrderDishes");
		SQL_GET_ORDER_BY_ID = getSQL("sql.getOrderById");
		SQL_GET_ORDER_BY_ID_USER = getSQL("sql.getOrderByIdUser");
		SQL_GET_ALL_ORDERS = getSQL("sql.getAllOrders");
		SQL_GET_ORDER_DISHES = getSQL("sql.getOrderDishes");
		SQL_UPDATE_ORDER = getSQL("sql.updateOrder");
		SQL_UPDATE_ORDER_DISHES = getSQL("sql.updateOrderDishes");
		SQL_DELETE_ORDER_BY_ID = getSQL("sql.deleteOrderById");
		SQL_DELETE_ORDER_DISHES = getSQL("sql.deleteOrderDishes");
		SQL_GET_MAX_ID_ORDER = getSQL("sql.getMaxIdOrder");
		SQL_FOUND_LOGIN = getSQL("sql.foundLogin");
		SQL_FOUND_EMAIL = getSQL("sql.foundEmail");
	}
	
	public static ConfifurationManager getConfig() {
		if(instance == null) {
			instance = new ConfifurationManager();
		}
		return instance;
	}
	
	private String getProperty(String key){
		final String CONFIG_FILE_NAME = "database.properties";
		Properties configFile = new Properties();
		
		try {
			InputStream file = getClass().getClassLoader().getResourceAsStream(CONFIG_FILE_NAME);
			configFile.load(file);
		} catch (FileNotFoundException e) {
			System.err.println("File " + CONFIG_FILE_NAME + " not found");
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return configFile.getProperty(key);
	}
	
	private String getSQL(String key){
		final String CONFIG_FILE_NAME = "sql.properties";
		Properties configFile = new Properties();
		
		try {
			InputStream file = getClass().getClassLoader().getResourceAsStream(CONFIG_FILE_NAME);
			configFile.load(file);
		} catch (FileNotFoundException e) {
			System.err.println("File " + CONFIG_FILE_NAME + " not found");
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return configFile.getProperty(key);
	}
}
