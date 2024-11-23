using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NutriBem.Infra.Database.Migrations
{
    /// <inheritdoc />
    public partial class AddRecipeUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "recipe_user",
                columns: table => new
                {
                    Id = table.Column<string>(type: "character varying(26)", nullable: false),
                    RecipeId = table.Column<string>(type: "text", nullable: false),
                    UserId = table.Column<string>(type: "character varying(26)", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    ImageUrl = table.Column<string>(type: "text", nullable: true),
                    Calories = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_recipe_user", x => x.Id);
                    table.ForeignKey(
                        name: "FK_recipe_user_user_UserId",
                        column: x => x.UserId,
                        principalTable: "user",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_recipe_user_UserId",
                table: "recipe_user",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "recipe_user");
        }
    }
}
