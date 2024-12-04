#!/bin/bash

# Exit on error
set -e

# Load environment variables
if [ -f .env ]; then
    source .env
fi

# Default values
DB_USER=${POSTGRES_USER:-postgres}
DB_PASSWORD=${POSTGRES_PASSWORD:-postgres}
DB_HOST=${POSTGRES_HOST:-localhost}
DB_PORT=${POSTGRES_PORT:-5432}

# Create production database
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -c "CREATE DATABASE app_production;" || echo "Production database already exists"

# Create test database
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -c "CREATE DATABASE app_test;" || echo "Test database already exists"

# Run migrations
echo "Running migrations..."
cd backend
npx prisma migrate deploy

# Seed production database if needed
if [ "$NODE_ENV" != "production" ]; then
    echo "Seeding development database..."
    npx prisma db seed
fi

echo "Database setup completed successfully!" 