import React from 'react'
import { ScreenLayout } from '../../components/screen-layout'
import { ButtonPrimary,  Typography, Radio, Headline2, Divider } from '../../components'
import {IconLoader} from '../../components/icon/icon-loader'
import  TextInput  from '../../components/inputs/text-input'
import { ScreenDivider } from '../../components/screen-divider'
import { AiOutlineSmile } from 'react-icons/ai';
import {PiHamburgerLight} from 'react-icons/pi'
import {CiDeliveryTruck} from 'react-icons/ci'
import {BiTimeFive} from 'react-icons/bi'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';

import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const DemoScreen = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <ScreenLayout>
        <ScreenLayout.Header colorScheme="white" title="Бауырсаки от Бауыржана" backgroundImg="https://i.pinimg.com/1200x/a9/92/03/a992036c83a31950155fee1358153d7d.jpg" onClick={() => {console.log('test')}} />
        <ScreenLayout.Content>
            <Headline2 style={{width: "100px"}}  variant="h2"
        as="h2" colorScheme="primary">
              BAURZHAN FORUM
              </Headline2>

<div >
  <div >
              <Typography style={{marginBottom: "15px",  display: 'flex', alignItems: "center"}} colorScheme="primary">
              Вкус настоящего бауырсака   <PiHamburgerLight style={{ marginLeft: '10px',}}
            />
              </Typography>
              <Typography style={{display: 'flex', alignItems: "center"}} colorScheme="primary">
              Потрясающе 8.8              <AiOutlineSmile style={{ marginLeft: '10px',}}/>
              </Typography>
             <Typography style={{display: 'flex', alignItems: "center"}} colorScheme="primary">
              Открыто Закрывается в 23:45 <BiTimeFive style={{ marginLeft: '10px',}}/>
              </Typography>
             <Typography style={{display: 'flex', alignItems: "center"}} colorScheme="primary">
              Доставка через 15-25 мин   <CiDeliveryTruck style={{ marginLeft: '10px',}}/>
              </Typography>
              <Typography  style={{marginBottom: "15px", display: 'flex', alignItems: "center"}} colorScheme="primary">
              Zheltoksan Street 191 
              </Typography>
              </div>
              </div>
            <ScreenDivider size="sm"/>
            <IconLoader name='icon:core/common/ic24ArrowLeft' colorScheme='brandPrimary' />
         
        <TextInput name="Поиск" label="Поиск"/>
        <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
       
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      />
      <CardContent>
      <Typography style={{marginBottom: "15px",  display: 'flex', alignItems: "center"}} colorScheme="primary"
              Вкус настоящего бауырсака   
            />
      </CardContent>
      <CardActions disableSpacing>
       
     
      
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        <Typography style={{marginBottom: "15px",  display: 'flex', alignItems: "center"}} colorScheme="primary"
              Вкус настоящего бауырсака   
            />
       <Typography style={{marginBottom: "15px",  display: 'flex', alignItems: "center"}} colorScheme="primary"
              Вкус настоящего бауырсака   
            />
        <Typography style={{marginBottom: "15px",  display: 'flex', alignItems: "center"}} colorScheme="primary"
              Вкус настоящего бауырсака   
            />
       <Typography style={{marginBottom: "15px",  display: 'flex', alignItems: "center"}} colorScheme="primary"
              Вкус настоящего бауырсака   
            />
        </CardContent>
      </Collapse>
    </Card>
        <Radio
                            name={'Radio2'}
                            checked={false}
                            size="md"
                            verticalMargin="inner"
                            onChange={() => console.log('smth')}
                            value={"Radio2"}
                        >
                          Radio2
                        </Radio>
        <ButtonPrimary fullWidth title='Заказать' colorScheme='brandPrimary' />
                         
        </ScreenLayout.Content>
        </ScreenLayout>
  )
}

export default DemoScreen