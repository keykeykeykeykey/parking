package com.parking.dao;

import java.util.List;
import java.util.Map;

import com.parking.util.ResultSetSQL;

public class UserDao {
	ResultSetSQL resultSetSQL = new ResultSetSQL();
	public List<Map<String, Object>> selectAll(){
		try{
			String sql = "select * from user";
			return resultSetSQL.excuteQuery(sql);
		}catch(Exception e){
			System.out.println("操作数据库错误");
		}
		return null;
	}
}
