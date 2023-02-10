FROM nginx

COPY ./deploy/nginx.conf /etc/nginx/nginx.conf
COPY ./dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf

EXPOSE 80

# 运行启动 nginx
CMD ["nginx","-g","daemon off;"]