<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('contracts', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id');
            $table->date('start_date');
            $table->date('end_date');
            $table->integer('monthly_salary');
            $table->uuid('shift_id');
            $table->uuid('pharmacy_id')->nullable(); // Nullable since pharmacies don't exist yet
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('user_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('cascade');

            $table->foreign('shift_id')
                  ->references('id')
                  ->on('shifts')
                  ->onDelete('cascade');

            // Pharmacy foreign key will be added later when pharmacies table is created
            // $table->foreign('pharmacy_id')
            //       ->references('id')
            //       ->on('pharmacies')
            //       ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contracts');
    }
};
