<%@page contentType="text/html; charset=UTF-8"%> 
<%@page import="org.json.simple.JSONObject"%>
<%@page import="org.json.simple.JSONArray"%>
<%@ page import="java.util.*"%>
<%@ page import="java.sql.*,
                java.util.ArrayList" %>

 <% 
  Connection con = null;
  Statement stmt = null;

	try {
		Class.forName ("com.ibm.db2.jcc.DB2Driver");
		}
	catch (ClassNotFoundException e)
	{
		e.printStackTrace();
		}

	try {  
	 	con = DriverManager.getConnection("jdbc:db2://zrw-db2shl94.zrw.oao.rzd:50000/REST","K94PO44","CTVERBFJ");
		stmt = con.createStatement();  
		}

	catch (SQLException ee) 
	{   
		
		if (con != null) 
		{
			con.rollback(); 
			con.close();
		}
		out.println("<p>Ошибка коннекта с БД!</p>");
	}	
	
	String chin ="";
	String rus ="";
	ArrayList arr = new ArrayList();
	String SQL = "SELECT id, symbol, value FROM TRAN.BIBL";
	
	ResultSet rs= stmt.executeQuery(SQL);
	
	JSONArray array = new JSONArray(); 
	JSONObject obj = new JSONObject(); 	
	
	response.setHeader("Access-Control-Allow-Origin", "*");
	

	while(rs.next()){
		obj = new JSONObject(); 	
		obj.put("id", rs.getString(1));		
		obj.put("chin", rs.getString(2));
		obj.put("rus", rs.getString(3));		
		array.add(obj);
	}
	out.println(array);	
	out.flush();
%>
 
 
