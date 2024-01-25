function displaytodo()
{
    console.log("hello");
    fetch('http://127.0.0.1:8000/displaytodo')
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data);
        let S=``;
        data.map((dt)=>{
            S+=`<tr>
                <td>${dt.task}</td>;
                <td>${dt.priority}</td>;
                <td><button onclick="delete_todo(${dt.id})">Delete</button></td>
                <td><a href="update/${dt.id}"><button>Update</button></a></td>
                </tr>`
            console.log(dt.task);
        });
        document.getElementById('ls').innerHTML=S
    });
}

displaytodo();

function editTodo(todoId) {
    let task = document.getElementById('task').value;
    let priority = document.getElementById('priority').value;

    fetch(`http://127.0.0.1:8000/editTodo/${todoId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task, priority }),
    })
        .then(response => {
            if (response.ok) {
                alert("Todo Updated");
                document.getElementById('task').value = '';
                document.getElementById('priority').value = '';
                document.getElementById('submitButton').innerText = 'Add Todo';
                document.getElementById('submitButton').onclick = frm;
                displayTodo();
            } else {
                alert("Todo Not Updated");
            }
        })
        .catch(error => console.error('Error:', error));
}


function delete_todo(todoId) {
    fetch(`http://127.0.0.1:8000/delete_todo/${todoId}`, { method: 'DELETE' })
        .then((res) => {
            console.log(res.status);
            if (res.status === 202) {
                alert("Todo Deleted");
                displaytodo();
            } else {
                alert("Todo Not Deleted");
            }
        })
        .catch((error) => {
            console.log(error);
        });
}


function frm()
{
    let task=document.getElementById('task').value;
    let priority=document.getElementById('priority').value;

    fetch('http://127.0.0.1:8000/addTodo/',{method:'post',body:JSON.stringify({"task":task,"priority":priority})})
    .then((res)=>{
        console.log(res.status);
        if (res.status==201)
        {
            alert("Todo Added")
            displaytodo();
        }
        else

        {
            alert("Todo Not Added")
        }
    })

    .catch((error)=>{
        console.log(error);
  })
}
