package com.parking.service;
import java.util.List;
import java.util.Map;

import com.parking.dao.*;


public class UserService {
	private UserDao userdao = new UserDao();
	
	public List<Map<String, Object>> selectAll()
	{
		try 
		{
			return this.userdao.selectAll();
		}
		catch(Exception e)
		{
			System.out.println("错误");
		}
		return null;
	}
}
