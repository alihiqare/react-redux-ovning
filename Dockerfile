FROM hshar/ubuntunew1212

ADD Blob /var/www/html/

CMD apachetcl -D FOREGROUND

RUN rm var/www/html/index.html
