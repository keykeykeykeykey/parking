package com.parking.dao;

import java.util.List;
import java.util.Map;

import com.parking.util.ResultSetSQL;

public class ParkingDao {
	ResultSetSQL resultSetSQL = new ResultSetSQL();
	public List<Map<String, Object>> selectAll(){
		try{
			String sql = "select * from parking";
			return resultSetSQL.excuteQuery(sql);
		}catch(Exception e){
			System.out.println("操作数据库错误");
		}
		return null;
	}
	
	public int deleteById(String id){
		try{
			String sql = "DELETE FROM parking WHERE id = " + id;
			return resultSetSQL.executeUpdate(sql);
		}catch(Exception e){
			System.out.println("操作数据库错误");
		}
		return 1;
	}
	
	public List<Map<String, Object>> findParkingById(String id){
		try{
			String sql = "select * from parking where id = " + id;
			return resultSetSQL.excuteQuery(sql);
		}catch(Exception e){
			System.out.println("操作数据库错误");
		}
		return null;
	}
	
	public int addParking(String num,String price){
		try{
			String sql = "INSERT INTO parking (num,price) VALUES('"+ num + "'," + price +")";
			return resultSetSQL.executeUpdate(sql);
		}catch(Exception e){
			System.out.println("操作数据库错误");
		}
		return 1;
	}
	
	public int updateParking(String id,String num,String price){
		try{
			String sql = "UPDATE parking SET num = '" + num +"',price = " + price + " WHERE id = " + id;
			return resultSetSQL.executeUpdate(sql);
		}catch(Exception e){
			System.out.println("操作数据库错误");
		}
		return 1;
	}
}
