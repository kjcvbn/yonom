# Yonom
스크롤에 따른 지정영역의 화면 진입 체크 모듈입니다.

### Usage

```javascript
$('.section').yonom({
    yonom: function(){
        ...
    },
    hide: function(){
        ...
    },
    show: function(){
        ...
    }
});
```

### Option

| option |  description |
| :----- | :----------- |
| show | 설정한 영역이 화면에 진입을 시작시 콜백|
| yonom | 설정한 영역이 지정된 위치 만큼 진입시 콜백 |
| hide | 설정한 영역이 화면에서 완전히 사라질때 콜백| 
| viewCheck | yonom 호출 위치 설정 1 ~ 10 ( defualt : 2 ) [영역 높이 / viewCheck ]|

### Dependencies

* jQuery  >=1.8.3