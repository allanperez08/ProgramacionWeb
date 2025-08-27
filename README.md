Hook Used
1. useState

const [tasks, setTasks] = useState([]);
const [filter, setFilter] = useState("all");

We used useState to store the main state of the application:
tasks: contains all tasks (each with id, name, and status).
filter: determines which tasks should be displayed (all, pending, completed).

2. useEffect

useEffect(() => {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    setTasks(JSON.parse(storedTasks));
  }
}, []);

useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);

Justification:
We used useEffect for side effects:
Load tasks from localStorage when the app starts (first render).
Save tasks in localStorage whenever the tasks state changes.
This ensures that the application keeps its state persistent, even if the page is refreshed.


CDN funcional y con URL en el README.md para poder acceder.
https://dqxp8j86taz06.cloudfront.net/index.html