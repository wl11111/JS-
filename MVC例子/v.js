function view(){
	var html = `
	<h3><%=title%>共有:<%=total%>条</h3>
	<ul>
		<%for(var i=0;i<subjects.length;i++){%>
			<li><img src="<%=subjects[i].images.small%>" /></li>
		<%}%>
	</ul>
	<div class="page">
		<%for(var i=0;i<page;i++){%>
			<a href="javascript:;"><%=(i+1)%></a>
		<%}%>
	</div>
	`;
	
	return html;
}
