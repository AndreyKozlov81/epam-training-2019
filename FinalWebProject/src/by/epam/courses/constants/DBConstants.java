package by.epam.courses.constants;
/**
 * the class contains constants for working with the database:
 * - table column names from the database
 * - the pattern of the output date
 * - information messages
 * 
 * @author AndreyKazlou
 * @version 1.0
 **/
public class DBConstants {
	public static final String ID_LABEL = "id";
	public static final String ID_USER_LABEL = "id_user";
	public static final String ROLE_LABEL = "role";
	public static final String ID_MENU_LABEL = "id_menu";
	public static final String LOGIN_LABEL = "login";
	public static final String EMAIL_LABEL = "email";
	public static final String ACCOUNT_LABEL = "account";
	public static final String NAME_LABEL = "name";
	public static final String NAME_RU_LABEL = "name_ru";
	public static final String COST_LABEL = "cost";
	public static final String TOTAL_COST_LABEL = "totalCost";
	public static final String DATE_LABEL = "date";
	public static final String NUMBER_LABEL = "number";
	//public static final String TABLE_LABEL = "tableNum";
	public static final String AMOUNT_LABEL = "amount";
	public static final String ACCEPTED_LABEL = "accepted";
	public static final String PAID_LABEL = "paid";
	public static final String CUSTOMER_ROLE = "customer";
	public static final String MAX_ID_LABEL = "max(id)";
	
	public static final String DATE_PATTERN = "yyyy-MM-dd";
	
	public static final String USER_NOT_CUSTOMER = "User is not customer";
	public static final String USER_ADDED = "true";
	public static final String USER_EXISTS = "false";
	public static final String ORDER_ACCEPTED = "Order accepted";
	public static final String ORDER_ADDED = "true";
	public static final String ORDER_NOT_ADDED = "false";
	public static final String DISH_DELETED = "true";
	public static final String DISH_NOT_DELETED = "false";
	public static final String DISH_CHANGED = "true";
	public static final String DISH_NOT_CHANGED = "false";
}
