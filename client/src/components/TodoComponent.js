import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import API from '../services/API';
const styles = {
  done: {
    color: '#94d162',
    display: 'flex',
    width: '100%'
  },
  mute: {
    opacity: '.5',
    display: 'flex',
    width: '100%'
  },
  header: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '10px'
  },
  main: {
    width: '100%',
    minHeight: '700px',
    maxWidth: '340px',
    margin: '10px 10px',
    // backgroundColor: '#deebdd',
    backgroundColor: 'whitesmoke',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: '#c9cac8',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  card: {
    padding: '10px',
    margin: '10px 10px'
  },
  todo: {
    position: 'relative',
    display: 'flex',
    flexFow: 'row',
    alignContent: 'space-between'
  },
  label: {
    display: 'flex',
    width: '80%'
  },
  divider: {
    position: 'absolute',
    width: '100%',
    top: 0
  },
  title: {
    fontFamily: 'Satisfy',
    marginBottom: '15px',
    fontSize: '35px'
  }
};

class TodoComponent extends React.Component {
  state = {
    tasks: [],
    newTask: '',
    queryString: []
  };

  componentDidMount() {
    try {
      if (this.props.tasks.pantryItems) {
        console.log(
          'this.props.tasks.pantryItems: ',
          this.props.tasks.pantryItems
        );

        // this.setState({ tasks: this.props.tasks.pantryItems });
      } else {
        console.log(
          'NONE this.props.tasks.pantryItems: ',
          this.props.tasks.pantryItems
        );
      }
    } catch (e) {
      console.log('error', e);
    }
  }

  savePantry = () => {
    console.log('SAVE PANTRY ITEMS', this.props.tasks);
    console.log('this.props.userid: ', this.props.userid);
    console.log('this.props.tasks: ', this.props.tasks);
    const newSavedPantry = {
      userId: this.props.userid,
      pantryItems: this.props.tasks
    };
    console.log('newSavedPantry: ', newSavedPantry);

    // save recipe then remove from the result state
    API.savePantry(newSavedPantry).then(response => {
      this.setState({ newTask: '' });
      // this.setState({ tasks: response.data });
      console.log('response.data after API Save Pantry: ', response.data);
    });
  };

  onTextUpdate = e => {
    if (e.target.value.match('^[a-zA-Z ]*$') != null) {
      this.setState({ newTask: e.target.value });
    }
  };

  addTask = () => {
    let { newTask } = this.state;
    this.props.setTasks(newTask);
    this.savePantry();
    this.setState({ newTask: '' });
  };

  keyPress = e => {
    if (e.key === 'Enter') {
      this.addTask();
    }
  };
  selectedFoods = () => {
    // let { tasks, queryString } = this.state;
    let { tasks } = this.props;
    let query = tasks
      .filter(items => items.done)
      .map(item => item.text)
      .toString();

    // console.log('String to Query', query);
    //this.props.setTasks(tasks);

    this.props.searchRecipes(query);
    // this.setState({ queryString: '' });
  };

  deleteTask = task => {
    let { tasks } = this.props;
    tasks.splice(tasks.indexOf(task), 1);
    this.setState({ newTask: '' });
    this.props.setTasks(tasks);
  };

  toggle = task => {
    let { tasks } = this.props;

    tasks[tasks.indexOf(task)].done = !tasks[tasks.indexOf(task)].done;
    // this.setState({ newTask: '' });
    this.props.setTasks(tasks);
  };

  render() {
    const { newTask } = this.state;
    const { tasks } = this.props;

    return (
      <div id="main" style={styles.main}>
        <Typography variant="h5" style={styles.title}>
          Your Pantry
        </Typography>
        <header style={styles.header}>
          <TextField
            label="ADD FOOD ITEM"
            value={newTask}
            onChange={this.onTextUpdate}
            onKeyPress={this.keyPress}
          />
          <Button
            variant="raised"
            color="primary"
            disabled={!newTask}
            onClick={this.addTask}
          >
            Add
          </Button>
        </header>
        {tasks.length > 0 && (
          <Card style={styles.card}>
            <FormGroup>
              {tasks.map((task, index) => (
                <div key={index} style={styles.todo}>
                  {index > 0 ? <Divider style={styles.divider} /> : ''}
                  <FormControlLabel
                    control={
                      <Switch
                        color="primary"
                        checked={task.done}
                        onChange={() => this.toggle(task)}
                      />
                    }
                    label={task.text}
                    style={task.done ? styles.done : styles.mute}
                  />
                  <Tooltip title="Delete food" placement="top">
                    <IconButton
                      aria-label="delete"
                      onClick={() => this.deleteTask(task)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              ))}
            </FormGroup>
          </Card>
        )}
        <Button onClick={this.selectedFoods}>Search</Button>
      </div>
    );
  }
}

export default TodoComponent;
