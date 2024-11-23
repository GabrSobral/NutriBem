using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NutriBem.Infra.Database.Migrations
{
    /// <inheritdoc />
    public partial class AddUserProfileColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Age",
                table: "user_profile",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Height",
                table: "user_profile",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MainObjective",
                table: "user_profile",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Sex",
                table: "user_profile",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Weight",
                table: "user_profile",
                type: "double precision",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Age",
                table: "user_profile");

            migrationBuilder.DropColumn(
                name: "Height",
                table: "user_profile");

            migrationBuilder.DropColumn(
                name: "MainObjective",
                table: "user_profile");

            migrationBuilder.DropColumn(
                name: "Sex",
                table: "user_profile");

            migrationBuilder.DropColumn(
                name: "Weight",
                table: "user_profile");
        }
    }
}
