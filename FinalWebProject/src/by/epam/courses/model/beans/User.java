package by.epam.courses.model.beans;

/**
 * This class describes the fields and methods of the user object
 * 
 * @author AndreyKazlou
 * @version 1.0
 **/
public class User {
	private int id;
	private String login;
	private String email;
	private String role;
	private String password;
		
	public User() {
		super();
	}

	public User(int id, String login, String email, String role, String password) {
		super();
		this.id = id;
		this.login = login;
		this.email = email;
		this.role = role;
		this.password = password;
	}
	
	public User(String login, String email, String role, String password) {
		super();
		this.login = login;
		this.email = email;
		this.role = role;
		this.password = password;
	}
	public User(int id, String login, String email, String role) {
		super();
		this.id = id;
		this.login = login;
		this.email = email;
		this.role = role;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
	

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((email == null) ? 0 : email.hashCode());
		result = prime * result + id;
		result = prime * result + ((login == null) ? 0 : login.hashCode());
		result = prime * result + ((password == null) ? 0 : password.hashCode());
		result = prime * result + ((role == null) ? 0 : role.hashCode());
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
		User other = (User) obj;
		if (email == null) {
			if (other.email != null)
				return false;
		} else if (!email.equals(other.email))
			return false;
		if (id != other.id)
			return false;
		if (login == null) {
			if (other.login != null)
				return false;
		} else if (!login.equals(other.login))
			return false;
		if (password == null) {
			if (other.password != null)
				return false;
		} else if (!password.equals(other.password))
			return false;
		if (role == null) {
			if (other.role != null)
				return false;
		} else if (!role.equals(other.role))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return id + " " + login + " " + email + " " + role;
	}
	
}
