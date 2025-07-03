# Sử dụng Node.js official image (phiên bản LTS)
FROM node:22
# Tạo thư mục app trong container và đặt làm working directory
WORKDIR /app
# Copy file package.json và package-lock.json (nếu có) để cài dependencies trước
COPY package*.json ./
# Cài đặt dependencies
RUN npm install
# Copy toàn bộ source code vào container
COPY . .
# Mở port mà app Node.js sẽ lắng nghe (ví dụ 5000)
EXPOSE 5000
# Khởi động app bằng câu lệnh node hoặc npm start
CMD ["npm", "run", "dev"]