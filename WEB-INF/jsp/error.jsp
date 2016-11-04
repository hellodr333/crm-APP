<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" session="false" isErrorPage="true"%>

<%@page import="com.dh.fw.base.PropertyUtil"%>

<%
  Throwable ex = null;
  if (exception != null) {
    ex = exception;
  } else if (request.getAttribute("javax.servlet.error.exception") != null) {
    ex = (Exception) request.getAttribute("javax.servlet.error.exception");
  }


  if (ex != null) {
    System.out.println("Request Info: \n" + request.getRequestURI() + "\nException: " + ex.getMessage());
  } else {
    System.out.println("Request Info: \n" + request.getRequestURI());
  }

  String homeDomain = PropertyUtil.getPropertyValue("service-config","home.domain");
  response.sendRedirect("http://" + homeDomain + "/error");
%>
