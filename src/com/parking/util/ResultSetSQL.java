package com.parking.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ResultSetSQL {
		// 数据库位置
		private static final String url = "jdbc:mysql://localhost:3306/parking?Unicode=true&characterEncoding=UTF-8";

		//数据库用户名
		private static final String username = "root";

		//数据库密码
		private static final String password = "root";

		//导包
		private static final String jdbcDriver = "com.mysql.jdbc.Driver";
		
		public Connection getConnetion() {

			Connection conn = null;
			try {
				Class.forName(jdbcDriver);
				conn = DriverManager.getConnection(url, username, password);
			} catch (SQLException e) {
				e.printStackTrace();
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			}
			return conn;
		}
		
		@SuppressWarnings("unchecked")
		public List<Map<String, Object>> excuteQuery(String sql) throws Exception{
			PreparedStatement s= null;
			Connection con = null;
			ResultSet rs = null;
			try {
				con = this.getConnetion();
				s = con.prepareStatement(sql);
				rs = s.executeQuery();
				return (List<Map<String, Object>>) doHander(rs);
			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				con.close();
				s.close();
				rs.close();
			}
			return null;
		}
		public int executeUpdate(String sql) throws Exception{
			PreparedStatement s = null;
			Connection con = null;
			try {
				con = this.getConnetion();
				con.setAutoCommit(false);
				s = con.prepareStatement(sql);
				int result = s.executeUpdate();
				con.commit();
				con.setAutoCommit(true);
				return result;

			} catch (Exception e) {
				try {
					con.rollback();
					if (!con.getAutoCommit()) {
						con.setAutoCommit(true);
					}

				} catch (SQLException e1) {
					e1.printStackTrace();
				}
				e.printStackTrace();
			} finally {
				con.close();
				s.close();
			}
			return -1;
		}
		public Object doHander(ResultSet rs) throws Exception {
			List<Map<String, Object>> result = new ArrayList<Map<String,Object>>();			
			ResultSetMetaData resultSetMetaData =  rs.getMetaData();			
			int cols = resultSetMetaData.getColumnCount();			
			HashMap<String, Object> hashMap = null;			
			while(rs.next()){			
				hashMap = new HashMap<String, Object>();			
				for (int i = 1; i <= cols; i++) {
					hashMap.put(resultSetMetaData.getColumnLabel(i), rs.getObject(i)); 				
				}			
				result.add(hashMap);				
			}
			return result;
		}
}
