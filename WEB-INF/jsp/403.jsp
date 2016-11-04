<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" session="false" isErrorPage="true"%>

<%@page import="com.dh.fw.base.PropertyUtil"%>

<%
  String homeDomain = PropertyUtil.getPropertyValue("service-config","home.domain");
  response.sendRedirect("http://" + homeDomain + "/error");
%>
