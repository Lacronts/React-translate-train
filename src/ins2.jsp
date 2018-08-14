<%@page language="java" contentType="text/html; charset=UTF8" pageEncoding="UTF8"%>
<%@page import="java.util.Date"%>
<%@page import="java.sql.*"%>
<% 
  request.setCharacterEncoding("utf8");
  String chin= request.getParameter("chinese");
  String rus = request.getParameter("russian");
  
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
Integer id=0;
String SQL = "SELECT max(id) as id FROM TRAN.BIBL";
ResultSet rs = stmt.executeQuery(SQL);
rs.next();
id = rs.getInt("id")+1;
String returned = "{"+"\"rus\""+":\""+rus+"\","+"\"chin\""+":\""+chin+"\","+"\"id\""+":\""+id+"\"}";
out.println(returned);
String SQLInsert = "INSERT INTO TRAN.BIBL "+
					" (symbol, value, id)"+
					" values('"+chin+"','"+rus+"',"+id+")";
	response.setHeader("Access-Control-Allow-Origin", "*");					
try {
	stmt.executeUpdate(SQLInsert);
	}  catch(SQLException ex) {
	if (ex.getErrorCode()==-803) out.println("<script>alert('Такая запись уже есть');</script>"); 
	   else {
		if (ex.getErrorCode()==-104) {out.println("<script>alert('Заполните данные, ошибка:"+ex.getErrorCode()+"!');</script>");	
		}else {
				if (ex.getErrorCode()==-404) out.println("<script>alert('Введите не более 50 символов, ошибка:"+ex.getErrorCode()+"!');</script>"); 
				else {
					ex.printStackTrace();
					session.setAttribute("ERR","nins.jsp. Error - SQLException.");       
					session.setAttribute("ERR_DESCRIPTION","Message: "+ex.getMessage()+"  SQLState: "+ex.getSQLState()+"   ErrorCode: "+ex.getErrorCode());
					out.println(ex.getErrorCode());
					session.setAttribute("ERR_SQL","");
					response.sendRedirect("../vagper/error.jsp");
		}
		}
	    }
	}
	finally {

//-------------------------------------------------------------   
    stmt.close();
    con.close();
}
%>


