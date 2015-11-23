<table
	data-content-type="application/json"
	data-data-type="json"
	data-toggle="table"
	data-url="{{ url('api/users') }}"
	data-toolbar="#toolbar"
	data-show-refresh="true"
	data-search="true"
	data-select-item-name="toolbar1"
	data-pagination="true"
	data-sort-name="id"
	data-sort-order="asc"
	data-flat="true"
	class="table table-hover">
    <thead>
	    <tr>
	        <th data-field="name" data-align="center" data-valign="middle" data-sortable="true">Nume si prenume</th>
	        <th data-field="email" data-align="center" data-valign="middle" data-sortable="true">Email</th>
	        <th data-field="active" data-align="center" data-valign="middle" data-sortable="true" data-formatter="StatusFormatter">Status</th>
	        <th data-field="updated_at" data-align="center" data-valign="middle" data-sortable="true">Ultima logare</th>
	        <th data-field="actions" data-align="center" data-valign="middle" data-sortable="false" data-formatter="ActionsFormatter">Actiuni</th>
	    </tr>
    </thead>
</table>