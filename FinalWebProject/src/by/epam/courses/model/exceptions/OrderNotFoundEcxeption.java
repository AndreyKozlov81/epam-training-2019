package by.epam.courses.model.exceptions;

import java.io.IOException;

public class OrderNotFoundEcxeption extends IOException{
	private String info;
	private String value;
	
	public OrderNotFoundEcxeption() {
		super();
	}

	public OrderNotFoundEcxeption(String info, String value) {
		super();
		this.info = info;
		this.value = value;
	}

	public String getInfo() {
		return info;
	}

	public String getValue() {
		return value;
	}
}
