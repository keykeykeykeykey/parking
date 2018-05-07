package com.parking.service;
import java.util.List;
import java.util.Map;

import com.parking.dao.*;


public class ParkingService {
	private ParkingDao parkingdao = new ParkingDao();
	
	public List<Map<String, Object>> selectAll()
	{
		try 
		{
			return this.parkingdao.selectAll();
		}
		catch(Exception e)
		{
			System.out.println("错误");
		}
		return null;
	}
	
	public int deleteById(String id){
		try 
		{
			return this.parkingdao.deleteById(id);
		}
		catch(Exception e)
		{
			System.out.println("错误");
		}
		return 1;
	}
	
	public List<Map<String, Object>> findParkingById(String id){
		try 
		{
			return this.parkingdao.findParkingById(id);
		}
		catch(Exception e)
		{
			System.out.println("错误");
		}
		return null;
	}
	
	public int addParking(String num,String price){
		try 
		{
			return this.parkingdao.addParking(num,price);
		}
		catch(Exception e)
		{
			System.out.println("错误");
		}
		return 1;
	}
	
	public int updateParking(String id,String num,String price){
		try 
		{
			return this.parkingdao.updateParking(id,num,price);
		}
		catch(Exception e)
		{
			System.out.println("错误");
		}
		return 1;
	}
}
