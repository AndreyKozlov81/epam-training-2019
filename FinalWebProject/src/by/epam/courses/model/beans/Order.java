package by.epam.courses.model.beans;

import java.sql.Date;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Map;

import by.epam.courses.constants.DBConstants;

/**
 * This class describes the fields and methods of the order object
 * 
 * @author AndreyKazlou
 * @version 1.0
 **/
public class Order {
	private int id;
	private Date date;
	private Map<Dish, Integer> dishes;
	private User user;
	private boolean accepted;
	private boolean paid;
	private double totalCost;
	
	public Order() {
		super();
	}

	public Order(int id, Date date, Map<Dish, Integer> dishes, User user, boolean accepted, boolean paid, double totalCost) {
		super();
		this.id = id;
		this.date = date;
		this.dishes = dishes;
		this.user = user;
		this.accepted = accepted;
		this.paid = paid;
		this.totalCost = totalCost;
	}
	public Order(int id, String date, Map<Dish, Integer> dishes, User user, boolean accepted, boolean paid, double totalCost) throws ParseException {
		super();
		this.id = id;
		setDate(date);
		this.dishes = dishes;
		this.user = user;
		this.accepted = accepted;
		this.paid = paid;
		this.totalCost = totalCost;
	}
	public Order(int id, Date date, Map<Dish, Integer> dishes, User user, boolean accepted, boolean paid) {
		super();
		this.id = id;
		this.date = date;
		this.dishes = dishes;
		this.user = user;
		this.accepted = accepted;
		this.paid = paid;
	}
	
	public Order(int id, Date date, boolean accepted, boolean paid, double cost) {
		super();
		this.id = id;
		this.date = date;
		this.accepted = accepted;
		this.paid = paid;
		this.totalCost = cost;
	}
	
	public Order(Date date, Map<Dish, Integer> dishes, User user, boolean accepted, boolean paid) {
		super();
		this.date = date;
		this.dishes = dishes;
		this.user = user;
		this.accepted = accepted;
		this.paid = paid;
	}
	
	public Order(Date date, User user, boolean accepted, boolean paid) {
		super();
		this.date = date;
		this.user = user;
		this.accepted = accepted;
		this.paid = paid;
	}
	
	public Order(String date, User user, boolean accepted, boolean paid) throws ParseException {
		super();
		setDate(date);
		this.user = user;
		this.accepted = accepted;
		this.paid = paid;
	}
	
	public Order(String date, Map<Dish, Integer> dishes, User user, boolean accepted, boolean paid) throws ParseException {
		super();
		setDate(date);
		this.dishes = dishes;
		this.user = user;
		this.accepted = accepted;
		this.paid = paid;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}
	
	private void setDate(String date) throws ParseException {
		DateFormat format = new SimpleDateFormat(DBConstants.DATE_PATTERN);
		Date tempDate = (Date) format.parse(date);
		this.date = new Date(tempDate.getTime());
	}

	public Map<Dish, Integer> getDishes() {
		return dishes;
	}

	public void setDishes(Map<Dish, Integer> dishes) {
		this.dishes = dishes;
	}
	
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	public boolean isAccepted() {
		return accepted;
	}

	public void setAccepted(boolean accepted) {
		this.accepted = accepted;
	}

	public boolean isPaid() {
		return paid;
	}

	public void setPaid(boolean paid) {
		this.paid = paid;
	}
	
	public void setTotalCost() {
		totalCost = 0;
		dishes.forEach((k, v) -> totalCost += (k.getCost() * v));
	}
	
	public double getTotalCost() {
		return totalCost;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((user == null) ? 0 : user.hashCode());
		result = prime * result + ((date == null) ? 0 : date.hashCode());
		result = prime * result + ((dishes == null) ? 0 : dishes.hashCode());
		result = prime * result + id;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Order other = (Order) obj;
		if (!user.equals(other.user))
			return false;
		if (!date.equals(other.date))
			return false;
		if (!dishes.equals(other.dishes))
			return false;
		if (id != other.id)
			return false;
		return true;
	}

	@Override
	public String toString() {
		StringBuilder order = new StringBuilder();
		dishes.forEach((v,k) -> order.append("\n" + v.getName() + " - " + k));
		return "Order #" + id + " " + date + " " + user + " " + totalCost + order.toString(); 
	}
	
	
}
