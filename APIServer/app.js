const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const morgan = require('morgan');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');

dotenv.config(); // .env 파일에서 환경 변수 로드
const v1 = require('./routes/v1');
const v2 = require('./routes/v2');
const authRouter = require('./routes/auth');
const indexRouter = require('./routes');
const { sequelize } = require('./models');
const passportConfig = require('./passport');

const app = express();
passportConfig(); // Passport 설정을 초기화
app.set('port', process.env.PORT || 8002);
app.set('view engine', 'html');// 뷰 엔진을 HTML로 설정합니다.
nunjucks.configure('views', {
  express: app, // express 애플리케이션을 전달하여 nunjucks와 연동
  watch: true, // 템플릿 파일의 변경 감지를 활성화
});
sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/v1', v1);
app.use('/v2', v2);
app.use('/auth', authRouter);
app.use('/', indexRouter);

// 요청에 대한 라우터가 없는 경우 404 에러 처리
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
