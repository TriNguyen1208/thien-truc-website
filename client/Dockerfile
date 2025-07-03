# 1. Dùng Node để build và chạy React app
FROM node:22
# 2. Thư mục làm việc trong container
WORKDIR /app
# 3. Copy các file package trước để cache khi build
COPY package*.json ./
# 4. Cài đặt dependencies
RUN npm install
# 5. Copy toàn bộ mã nguồn React vào container
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
