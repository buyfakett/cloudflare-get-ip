# 获取源ip

使用`cloudflare workers`实现获取源站ip

```shell
# 获取ip
curl https://ip.tteam.icu
# 获取ip详细信息
curl https://ip.tteam.icu/ip
```

nginx实现方式(只能获取ip)

```conf
server {
	listen 80;
	server_name xxx;

	location / {
		access_log /data/logs/nginx/json_ip.log json;
		proxy_set_header Host $http_host;
    proxy_set_header X-Real-Ip $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_pass http://127.0.0.1:9999;
	}
}

server {
	listen 9999;

	location / {
		access_log off;
		default_type application/json;
		return 200 "{\"ip\":\"$http_X_Real_Ip\"}";
	}
}
```
