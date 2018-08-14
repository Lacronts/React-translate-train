<%@ page contentType="text/html; charset=utf8"%>
<%@page import="java.util.Date"%>
<%@page import="java.sql.*"%>

<% 
  	response.setHeader("Access-Control-Allow-Origin", "*");
//Получение параметров со страницы инициатора
  String id		= request.getParameter("itemid");
  out.println(id);
	Connection con = null;
	Statement stmt = null;

	try {
		Class.forName ("com.ibm.db2.jcc4.DB2Driver");
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

			con.close();
		}
		out.println("<p>Ошибка коннекта с БД!</p>");
	}
	
String SQLInsert = "DELETE FROM TRAN.BIBL WHERE id="+id+"";
stmt.executeUpdate(SQLInsert);
    stmt.close();
    con.close();
%>

