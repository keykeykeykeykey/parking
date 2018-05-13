package com.parking.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSON;
import com.parking.service.ParkingService;

/**
 * Servlet implementation class ParkingServlet
 */
@WebServlet("/com/parking/servlet/ParkingServlet")
public class ParkingServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ParkingServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/html;charset=UTF-8");
		ParkingService parkingservice = new ParkingService();
		PrintWriter out = response.getWriter();
		
		String method = request.getParameter("status");
		if(method.equals("all")){
			List<Map<String, Object>> parkings = parkingservice.selectAll();
			out.write(JSON.toJSONString(parkings));
			out.flush();
			out.close();
		}
		else if(method.equals("remove")){
			String id = request.getParameter("id");
			parkingservice.deleteById(id);
		}else if(method.equals("findParkingById")){
			String id = request.getParameter("id");
			List<Map<String, Object>> parkings = parkingservice.findParkingById(id);
			out.write(JSON.toJSONString(parkings));
			out.flush();
			out.close();
		}else if(method.equals("add")){
			String num = request.getParameter("num").toString();
			String price = request.getParameter("price");
			parkingservice.addParking(num, price);
		}else if(method.equals("edit")){
			String id = request.getParameter("id");
			String num = request.getParameter("num");
			String price = request.getParameter("price");
			parkingservice.updateParking(id, num, price);
		}else if(method.equals("not_stop")){
			List<Map<String, Object>> parkings = parkingservice.selectAllNotStop();
			out.write(JSON.toJSONString(parkings));
			out.flush();
			out.close();
		}else if(method.equals("addCar")){
			String id = request.getParameter("id");
			String carNum = request.getParameter("carNum");
			parkingservice.updateParkingByCar(id, carNum);
		}else if(method.equals("stopped")){
			List<Map<String, Object>> parkings = parkingservice.selectAllStopped();
			out.write(JSON.toJSONString(parkings));
			out.flush();
			out.close();
		}else if(method.equals("leaveCar")){
			String id = request.getParameter("id");
			parkingservice.updateParkingByLeave(id);
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request,response);
	}

}
